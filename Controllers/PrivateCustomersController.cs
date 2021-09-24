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
        [Route("api/privateCustomers/get/{id}")]
        public IActionResult Get(int id) 
        {
            var result = _db.PrivateCustomers.FirstOrDefault(x => x.Id == id);
            return Json(result);
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

            if (values.ContainsKey("typeId"))
            {
                var typeId = Convert.ToInt32(values["typeId"]);
                privates = privates.Where(x => x.TypeId == typeId);
            }

            if (values.ContainsKey("contractId"))
            {
                var contractId = Convert.ToInt32(values["contractId"]);
                privates = privates.Where(x => x.ContractId == contractId);
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

        [Route("api/privateCustomers/get/{customerId}/information")]
        public IActionResult GetInformation(int customerId) 
        {
            
            var customer = _db.PrivateCustomers
            .Include(x => x.Type)
            .Include(x => x.PrivateCustomerStatus)
            .FirstOrDefault(x => x.Id == customerId);
          
            return Json(new {

                Type = customer.Type.Name,
                Name = customer.GetFullName(),
                Status = customer.PrivateCustomerStatus.Name,
                StatusId = customer.PrivateCustomerStatusId,

            });
        }

        [Route("api/privateCustomers/get/catalog")]
        public IActionResult GetCatalog(int skip, int take, IDictionary<string, string> values) 
        {
             IQueryable<PrivateCustomer> privates = _db.PrivateCustomers
             .Include(x => x.Sex)
             .Include(x => x.Contract)
             .Include(x => x.Type)
             ;

            if (values.ContainsKey("name"))
            {
                var name = Convert.ToString(values["name"]);
                privates = privates.Where(x => x.FirstName.StartsWith(name) || x.LastName.StartsWith(name));
            }

            if (values.ContainsKey("identification"))
            {
                var identification = Convert.ToString(values["identification"]);
                privates = privates.Where(x => x.Identification.StartsWith(identification));
            }

            var items = _db.PrivateCustomers.Skip(skip).Take(take).Select(x => new {
                Id = x.Id,
                x.Identification,
                Name = x.GetFullName(),
                Sex = x.Sex.Name,
                Contract = x.Contract.Name,
                Type = x.Type.Name,
            });

            return Json(new
            {
                items,
                totalCount = privates.Count()
            });
        }

        [Route("api/privateCustomers/get/single")]
        public IActionResult GetCatalogSingle() 
        {
             IQueryable<PrivateCustomer> privates = _db.PrivateCustomers
             .Include(x => x.Sex)
             .Include(x => x.Contract)
             .Include(x => x.Type) ;

            

            var items = _db.PrivateCustomers.Select(x => new {
                Id = x.Id,
                x.Identification,
                Name = x.GetFullName(),
                Sex = x.Sex.Name,
                Contract = x.Contract.Name,
                Type = x.Type.Name,
            });

            return Json(items);
        }


        [Route("api/privateCustomers/post")]
        public IActionResult Post([FromBody] PrivateCustomer privateCustomer) 
        {           

            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            if(privateCustomer.Id == 1)
                return BadRequest("No se puede modificar este cliente ya que es para fines de facturas al contado");

            if(privateCustomer.TypeId == (int)ClientType.Contract) //convenio
            {
                if(privateCustomer.ContractId == null)
                    return BadRequest("Debe seleccionar el convenio cuando se estable como tipo Convenio");

            }

            if(privateCustomer.TypeId == (int)ClientType.Private) //privado
            {
                if(privateCustomer.ContractId != null)
                    return BadRequest("No debe seleccionar el convenio cuando se estable como tipo privado");

            }
            
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
                    x.PrivateCustomerStatusId,
                    x.Inss,
                    x.TypeId,
                    x.ContractId,
                    x.AddAt         
                    ,x.Observation
                });

                oldprivateCustomer.LastDateModificationAt = UserHelpers.GetTimeInfo();
                oldprivateCustomer.LastModificationBy = user.Username;

                _db.SaveChanges();
            }else{

                privateCustomer.ToUpperCase();

                privateCustomer.CreateAt = UserHelpers.GetTimeInfo();
                privateCustomer.CreateBy = user.Username;

                _db.PrivateCustomers.Add(privateCustomer);
                _db.SaveChanges();
            }

            return Json(privateCustomer);

        }

        [Route("api/privateCustomers/{customerId}/products")]
        public IActionResult Products(int customerId) 
        {
            var products = _db.VwLastMedicinesByPrivates.Where(x => x.PrivateCustomerId == customerId)
            .OrderByDescending(x => x.WorkOrderId)
            .Take(20);
            return Json(products);

        }
    }
}
