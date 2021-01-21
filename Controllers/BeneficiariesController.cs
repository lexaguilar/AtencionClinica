using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AtencionClinica.Extensions;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

namespace AtencionClinica.Controllers
{  
    public class BeneficiariesController : Controller
    {      
        private ClinicaContext _db = null;
        public BeneficiariesController(ClinicaContext db)
        {
            this._db = db;
        }

        [Route("api/beneficiaries/get/{inss}")]
        public IActionResult Get(int inss) 
        {

            var result = _db.Beneficiaries.Where(x => x.Inss == inss);

            return Json(result);
        }

        [Route("api/beneficiaries/get/{inss}/catalog")]
        public IActionResult GetCatalog(int inss) 
        {
            
            var result = _db.Beneficiaries.Include(x => x.Relationship).Where(x => x.Inss == inss && x.BeneficiaryStatusId == 1).Select(x => new {
                Id = x.Id,
                Name = x.GetFullName(),
                Relationship = x.Relationship.Name
            });

            return Json(result);
        }

        [Route("api/beneficiaries/post")]
        public IActionResult Post([FromBody] Beneficiary beneficiario) 
        {
            

            var user = this.GetAppUser();
            
            if(beneficiario.Id > 0){
                var oldBeneficiario = _db.Beneficiaries.FirstOrDefault(x => x.Id == beneficiario.Id);

                oldBeneficiario.CopyFrom(beneficiario, x => new { 
                    x.FirstName, 
                    x.LastName, 
                    x.Address, 
                    x.PhoneNumber,
                    x.CellNumber,
                    x.Email, 
                    x.BirthDate,
                    x.Identification,
                    x.SexId,
                    x.RegionId,
                    x.CityId,
                    x.BeneficiaryStatusId,
                    x.RelationshipId
                });

                oldBeneficiario.LastDateModificationAt = DateTime.Now;
                oldBeneficiario.LastModificationBy = user.Username;

                _db.SaveChanges();
            }else{

                beneficiario.CreateAt = DateTime.Now;
                beneficiario.CreateBy = user.Username;

                _db.Beneficiaries.Add(beneficiario);
                _db.SaveChanges();
            }

            return Json(beneficiario);

        }
    }
}
