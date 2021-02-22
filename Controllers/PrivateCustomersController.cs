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
    public class PrivateCustomersController : Controller
    {      
        private ClinicaContext _db = null;
        public PrivateCustomersController(ClinicaContext db)
        {
            this._db = db;
        }

        [Route("api/privateCustomers/get")]
        public IActionResult Get(int skip, int take, IDictionary<string, string> values) 
        {

            IQueryable<PrivateCustomer> privates = _db.PrivateCustomers          
            .OrderByDescending(x => x.Id);

            if (values.ContainsKey("firstName"))
            {
                var firstName = Convert.ToString(values["firstName"]);
                privates = privates.Where(x => x.FirstName.StartsWith(firstName));
            }

            if (values.ContainsKey("LastName"))
            {
                var LastName = Convert.ToString(values["LastName"]);
                privates = privates.Where(x => x.LastName.StartsWith(LastName));
            }

            if (values.ContainsKey("createAt"))
            {
                var createAt = Convert.ToDateTime(values["createAt"]);
                privates = privates.Where(x => x.CreateAt > createAt && x.CreateAt < createAt.AddDays(1));
            }

            var items = privates.Skip(skip).Take(take);

            return Json(new
            {
                items,
                totalCount = privates.Count()
            });
        }

        [Route("api/privateCustomers/get/catalog")]
        public IActionResult GetCatalog(int skip, int take, IDictionary<string, string> values) 
        {
             IQueryable<PrivateCustomer> privates = _db.PrivateCustomers;

            if (values.ContainsKey("name"))
            {
                var name = Convert.ToString(values["name"]);
                privates = privates.Where(x => x.FirstName.StartsWith(name) || x.LastName.StartsWith(name));
            }

            var items = _db.PrivateCustomers.Skip(skip).Take(take).Select(x => new {
                Id = x.Id,
                Name = x.GetFullName()
            });

            return Json(new
            {
                items,
                totalCount = privates.Count()
            });
        }

        [Route("api/privateCustomers/post")]
        public IActionResult Post([FromBody] PrivateCustomer privateCustomer) 
        {           

            var user = this.GetAppUser();
            
            if(privateCustomer.Id > 0){
                var oldprivateCustomer = _db.PrivateCustomers.FirstOrDefault(x => x.Id == privateCustomer.Id);

                privateCustomer.ToUpperCase();

                oldprivateCustomer.CopyFrom(privateCustomer, x => new { 
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
                });

                oldprivateCustomer.LastDateModificationAt = DateTime.Now;
                oldprivateCustomer.LastModificationBy = user.Username;

                _db.SaveChanges();
            }else{

                privateCustomer.ToUpperCase();

                privateCustomer.CreateAt = DateTime.Now;
                privateCustomer.CreateBy = user.Username;

                _db.PrivateCustomers.Add(privateCustomer);
                _db.SaveChanges();
            }

            return Json(privateCustomer);

        }
    }
}
