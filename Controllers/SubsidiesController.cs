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

namespace AtencionClinica.Controllers
{  
    [Authorize]
    public class SubsidiesController : Controller
    {      
        private ClinicaContext _db = null;
        public SubsidiesController(ClinicaContext db)
        {
            this._db = db;
        }

        [Route("api/subsidies/get")]
        public IActionResult Get(int skip, int take, IDictionary<string, string> values) 
        {
             IQueryable<Subsidy> subsidies = _db.Subsidies
             .Include(x => x.Beneficiary)           
             .Include(x => x.Cie10)           
            .OrderByDescending(x => x.Reference);

            if (values.ContainsKey("id"))
            {
                var id = Convert.ToInt32(values["id"]);
                subsidies = subsidies.Where(x => x.Id == id);
            }

            if (values.ContainsKey("inss"))
            {
                var inss = Convert.ToInt32(values["inss"]);
                subsidies = subsidies.Where(x => x.Inss == inss);
            }

             if (values.ContainsKey("areaId"))
            {
                var areaId = Convert.ToInt32(values["areaId"]);
                subsidies = subsidies.Where(x => x.AreaId == areaId);
            }

            if (values.ContainsKey("reference"))
            {
                var reference = Convert.ToString(values["reference"]);
                subsidies = subsidies.Where(x => x.Reference == reference);
            }

             if (values.ContainsKey("identification"))
            {
                var identification = Convert.ToString(values["identification"]);
                subsidies = subsidies.Where(x => x.Identification.StartsWith(identification));
            }

            if (values.ContainsKey("orderNumber"))
            {
                var identification = Convert.ToString(values["orderNumber"]);
                subsidies = subsidies.Where(x => x.OrderNumber.StartsWith(identification));
            }

            if (values.ContainsKey("createAt"))
            {
                var createAt = Convert.ToDateTime(values["createAt"]);
                subsidies = subsidies.Where(x => x.CreateAt > createAt && x.CreateAt < createAt.AddDays(1));
            }

            var totalCount = subsidies.Count();

            if (values.ContainsKey("requireTotalCount"))
            {
               var requireTotalCount = Convert.ToBoolean(values["requireTotalCount"]);
                if (requireTotalCount){
                        subsidies = subsidies.Skip(skip).Take(take);                
                }
            }

            var items = subsidies.Select(x => new {
                x.Id,
                x.Reference,
                x.Inss,
                x.BeneficiaryId,
                Nombre = $"{x.Beneficiary.FirstName} {x.Beneficiary.LastName}",
                x.AreaId,
                Cie10 =$"{x.Cie10.Id}-{x.Cie10.Name}",
                x.DoctorId,
                x.DateStart,
                x.DateEnd,
                x.Days,
                x.CreateAt,
                x.CreateBy,
                x.Active,
                x.Identification,
                x.OrderNumber
            });

            return Json(new
            {
                items,
                totalCount
            });

        }      

        [HttpPost("api/subsidies/post")]
        public IActionResult Post([FromBody] Subsidy subsidy) 
        {

            var existe = _db.Subsidies.Any(x => x.Reference == subsidy.Reference && x.Active);

            if(existe)
                return BadRequest($"Ya existe un subsidio con el No de bolete {subsidy.Reference}");

            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            var bene = _db.Beneficiaries.FirstOrDefault(x => x.Id == subsidy.BeneficiaryId);
            
            subsidy.Inss = bene.Inss;
            subsidy.Identification = bene.Identification;
            subsidy.Active = true;
            subsidy.CreateAt = UserHelpers.GetTimeInfo();
            subsidy.CreateBy = user.Username;
            _db.Subsidies.Add(subsidy);    

            _db.SaveChanges(); 

            return Json(subsidy);

        }      

        [HttpGet("api/subsidies/{id}/delete")]
        public IActionResult Delete(int id) {
            var subsidy = _db.Subsidies.FirstOrDefault(x => x.Id == id);

            if(subsidy != null)
            {
                subsidy.Active = false;
                _db.SaveChanges();
            }

            return Json(new { n = id });
        } 
    
    }
}
