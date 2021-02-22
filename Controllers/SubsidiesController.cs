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

            if (values.ContainsKey("inss"))
            {
                var inss = Convert.ToInt32(values["inss"]);
                subsidies = subsidies.Where(x => x.Inss == inss);
            }

            if (values.ContainsKey("reference"))
            {
                var reference = Convert.ToString(values["reference"]);
                subsidies = subsidies.Where(x => x.Reference == reference);
            }

            if (values.ContainsKey("createAt"))
            {
                var createAt = Convert.ToDateTime(values["createAt"]);
                subsidies = subsidies.Where(x => x.CreateAt > createAt && x.CreateAt < createAt.AddDays(1));
            }

            var items = subsidies.Skip(skip).Take(take).Select(x => new {
                x.Id,
                x.Reference,
                x.Inss,
                x.BeneficiaryId,
                Nombre = $"{x.Beneficiary.FirstName} {x.Beneficiary.LastName}",
                x.AreaId,
                Cie10 = x.Cie10.Name,
                x.DoctorId,
                x.DateStart,
                x.DateEnd,
                x.Days,
                x.CreateAt,
                x.CreateBy,
                x.Active
            });

            return Json(new
            {
                items,
                totalCount = subsidies.Count()
            });

        }      

        [HttpPost("api/subsidies/post")]
        public IActionResult Post([FromBody] Subsidy subsidy) 
        {

            var existe = _db.Subsidies.Any(x => x.Reference == subsidy.Reference && x.Active);

            if(existe)
                return BadRequest($"Ya existe un subsidio con el No de bolete {subsidy.Reference}");

            var user = this.GetAppUser();            

            var bene = _db.Beneficiaries.FirstOrDefault(x => x.Id == subsidy.BeneficiaryId);
            
            subsidy.Inss = bene.Inss;
            subsidy.Active = true;
            subsidy.CreateAt = DateTime.Now;
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
