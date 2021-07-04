using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
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
    public class CustomersController : Controller
    {      
        private ClinicaContext _db = null;
        public CustomersController(ClinicaContext db)
        {
            this._db = db;
        }

        [Route("api/customers/get")]
        public IActionResult Get() 
        {
            var result = _db.Customers.Where(x => x.CustomerStatusId == 1);

            return Json(result);
        }

        [Route("api/customers/get/{inss}")]
        public IActionResult GetById(string inss)
        {

            var id = 0;
            var success = Int32.TryParse(inss, out id);

            if(success){
                var result = _db.Customers.FirstOrDefault(x => x.Inss == id);

                if(result==null){
                    var beneficiary = _db.Beneficiaries.FirstOrDefault(x => x.InssAlternative == id);

                    if(beneficiary == null)
                        return BadRequest($"No se encontró el asegurado con el inss {inss}");

                    result = _db.Customers.FirstOrDefault(x => x.Inss == beneficiary.Inss);
                }

                if(result==null)
                    return BadRequest($"No se encontró el asegurado con el inss {inss}");

                var percapita = _db.Percapitas.Where(x => x.Inss == result.Inss).OrderByDescending(x => x.Id).FirstOrDefault(); 

                return Json(GetObject(result, percapita));
            }else{

                var customer = _db.Customers.FirstOrDefault(x => x.Identification == inss);

                if(customer != null)
                    id = customer.Inss;
                else
                    return BadRequest($"No se encontró el asegurado con el identificador {inss}");

                var result = _db.Customers.FirstOrDefault(x => x.Inss == id);     

                var percapita = _db.Percapitas.Where(x => x.Inss == result.Inss).OrderByDescending(x => x.Id).FirstOrDefault();              

                return Json(GetObject(result, percapita));
            }
        } 

        internal Object GetObject(Customer customer, Percapita percapita){
            return new{
                    customerStatusId= customer.CustomerStatusId,
                    customerTypeId= customer.CustomerTypeId,
                    dateAdd= customer.DateAdd,
                    firstName= customer.FirstName,
                    identification= customer.Identification,
                    inss= customer.Inss,
                    lastName= customer.LastName,
                    patronalId= customer.PatronalId,
                    patronal = percapita == null ? "" : percapita.Rason
                };
        }
    }
}
