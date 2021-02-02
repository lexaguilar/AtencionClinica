using System;
using System.Data;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AtencionClinica.Extensions;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


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

        [Route("api/beneficiaries/search/{id}")]
        public async Task<IActionResult> Search(string id) 
        {
            //Buscar por inss
            var inss = 0;
            var success = Int32.TryParse(id, out inss);

            if(success){

                var resultInss = _db.Beneficiaries
                .Include(x => x.Relationship)
                .Include(x => x.Sex)
                .Include(x => x.BeneficiaryStatus)
                .Where(x => x.Inss == inss)
                .Select(x => new {
                    inss=x.Inss,
                    sex = x.Sex.Name,
                    relationship = x.Relationship.Name,
                    identification = x.Identification,  
                    x.FirstName,
                    x.LastName,
                    x.BirthDate,
                    x.PhoneNumber,
                    x.CellNumber,
                    x.Email,
                    x.Address,
                    beneficiaryStatus = x.BeneficiaryStatus.Name
                });

                return Json(resultInss);
            }


            //Buscar por cédula
            var reg = new Regex(@"\d{3}?-");

            if(reg.IsMatch(id))
            {
                var result2 = _db.Beneficiaries
                .Include(x => x.Relationship)
                .Include(x => x.Sex)
                .Include(x => x.BeneficiaryStatus)
                .Where(x => x.Identification.StartsWith(id))
                .Select(x => new {
                    inss=x.Inss,
                    sex = x.Sex.Name,
                    relationship = x.Relationship.Name,
                    identification = x.Identification,  
                    x.FirstName,
                    x.LastName,
                    x.BirthDate,
                    x.PhoneNumber,
                    x.CellNumber,
                    x.Email,
                    x.Address,
                    beneficiaryStatus = x.BeneficiaryStatus.Name
                });
                return Json(result2);
            }

            //Buscar por nombre

            var result = _db.Beneficiaries
            .Include(x => x.Relationship)
            .Include(x => x.Sex)
            .Include(x => x.BeneficiaryStatus)
            .Where(x => x.FirstName.StartsWith(id) || x.LastName.StartsWith(id))
            .Select(x => new {
                    inss=x.Inss,
                    sex = x.Sex.Name,
                    relationship = x.Relationship.Name,
                    identification = x.Identification,  
                    x.FirstName,
                    x.LastName,
                    x.BirthDate,
                    x.PhoneNumber,
                    x.CellNumber,
                    x.Email,
                    x.Address,
                    beneficiaryStatus = x.BeneficiaryStatus.Name
                });
            return Json(result);
        }
    }
}
