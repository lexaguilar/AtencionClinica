using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AtencionClinica.Extensions;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

namespace AtencionClinica.Controllers
{
    [Authorize]  
    public class AdmisionsController : Controller
    {      
        private ClinicaContext _db = null;
        public AdmisionsController(ClinicaContext db)
        {
            this._db = db;
        }

        [Route("api/admisions/get")]
        public IActionResult Get(int skip, int take, IDictionary<string, string> values) 
        {
             IQueryable<Admission> admissions = _db.Admissions
             .Include(x => x.Beneficiary).ThenInclude(x => x.Relationship)            
            .OrderByDescending(x => x.CreateAt);

            if (values.ContainsKey("inss"))
            {
                var inss = Convert.ToInt32(values["inss"]);
                admissions = admissions.Where(x => x.Inss == inss);
            }

            if (values.ContainsKey("createAt"))
            {
                var createAt = Convert.ToDateTime(values["createAt"]);
                admissions = admissions.Where(x => x.CreateAt > createAt && x.CreateAt < createAt.AddDays(1));
            }

            var items = admissions.Skip(skip).Take(take).Select(x => new {
                x.Id,
                x.NumberOfDay,
                x.Inss,
                Nombre = x.Beneficiary.GetFullName(),
                Tipo = $"{x.Beneficiary.Relationship.Name}",
                x.AreaId,
                x.SpecialtyId,
                x.CreateAt,
                x.CreateBy,
                x.Active
            });

            return Json(new
            {
                items,
                totalCount = admissions.Count()
            });

        }      

        [HttpPost("api/admisions/post")]
        public IActionResult Post([FromBody] Admission admission) 
        {
            var user = this.GetAppUser(_db);

            if(user.AreaId != (int)AreaRestrict.Admision)
                return BadRequest("Solo se permite admisionar desde el area de Admision");

            var existe = _db.Admissions.Any(x => x.BeneficiaryId == admission.BeneficiaryId && x.CreateAt > DateTime.Today && x.Active);
            
            if(existe)
                return BadRequest("El beneficiario ya tiene una admision activa el dia de hoy");

            var bene = _db.Beneficiaries.FirstOrDefault(x => x.Id == admission.BeneficiaryId);

            if(bene.RelationshipId == 2) //Hijo
                if( (bene.BirthDate - DateTime.Today).Days/365 >= 12)
                    return BadRequest("Solo se permiten admisiones para los hijos edad igual 12 años o menor");

            admission.Inss = bene.Inss;
            admission.Active = true;
            admission.NumberOfDay = getMaxAdmissionOfDay();
            admission.CreateAt = DateTime.Now;
            admission.CreateBy = user.Username;
            _db.Admissions.Add(admission);    

            var follow = new Follow{
                Admission = admission,
                AreaSourceId = 2, //admision
                AreaTargetId = admission.AreaId,
                Observation = "Tranferencia automatica de admision",
                CreateAt = DateTime.Now,
                CreateBy = user.Username                
            };

            _db.Follows.Add(follow);

            _db.SaveChanges();

            return Json(admission);

        }      

        [HttpGet("api/admisions/{id}/delete")]
        public IActionResult Delete(int id) {
            var admision = _db.Admissions.FirstOrDefault(x => x.Id == id);

            if(admision != null)
            {
                admision.Active = false;
                _db.SaveChanges();
            }

            return Json(new { n = id });
        } 

        [Route("api/admisions/get/{beneficiaryId}/last/{top}")]
        public IActionResult Get(int beneficiaryId, int top) 
        {
            IQueryable<Admission> admissions = _db.Admissions
            .Include(x => x.Area)
            .Include(x => x.Specialty)
            .Where(x => x.BeneficiaryId == beneficiaryId && x.Active)
            .OrderByDescending(x => x.CreateAt);
            //TODO verificar si no hay descargue de inventario para poder anular
            var items = admissions.Take(top).Select(x => new {
                x.Id,
                x.NumberOfDay,
                x.Inss,
                Area = x.Area.Name,
                Especialidad = x.Specialty.Name,
                x.CreateAt,
                x.CreateBy,
                x.Active
            });

            return Json(items);

        }      

        private int getMaxAdmissionOfDay(){

            var max = _db.Admissions.Where(x => x.CreateAt > DateTime.Today)
            .OrderByDescending(x => x.NumberOfDay)
            .Select(x => x.NumberOfDay)
            .FirstOrDefault();
            
            return max + 1;
        }
    
    }
}
