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
        public IActionResult Get(bool active) 
        {
            IQueryable<Customer> result = _db.Customers;
            if (active)
                result = result.Where(x => x.CustomerStatusId == 1);   
            else
                result = result.Where(x => x.CustomerStatusId == 2);         

            return Json(result);
        }

        [Route("api/customers/get/{inss}/principal")]
        public IActionResult GetPrincipal(int inss) 
        {
           
            var result = _db.Customers.FirstOrDefault(x => x.Inss == inss);            

            return Json(result);
        }

        [Route("api/customers/post")]
        public IActionResult Get([FromBody]Customer customer)
        {

            var customerUpdate = _db.Customers.FirstOrDefault(x => x.Inss == customer.Inss);
            if (customerUpdate == null)
            {

                customer.DateAdd = DateTime.Today;
                customer.CustomerStatusId = 1;
                customer.CustomerTypeId = (int)CustomerTypes.Facultativo;

                _db.Customers.Add(customer);                
             

            }else{

                // if (customerUpdate.CustomerTypeId != (int)CustomerTypes.Facultativo && customer.CustomerStatusId == 1)
                //     return BadRequest("El asegurado no es facultativo, no se puede editar");

                //customer.CustomerTypeId = (int)CustomerTypes.Facultativo;

                customerUpdate.CopyFrom(customer, x => 
                    new { 
                        x.FirstName,
                        x.LastName,
                        x.PatronalId, 
                        x.Identification, 
                        x.CustomerStatusId, 
                        x.CustomerTypeId                                
                    });

            }

            _db.SaveChanges();

            return Json(customer);
           
        }

        [Route("api/customers/get/{inss}")]
        public IActionResult GetById(string inss, [FromQuery] bool onlyBeneficary)
        {

            var id = 0;
            var success = Int32.TryParse(inss, out id);

            if(success){

                Percapita percapitaResult = null;

                if(onlyBeneficary)
                    percapitaResult = _db.Percapitas
                    .Where(x => x.InssPareja == id
                        || x.InssHijo1 == id
                        || x.InssHijo2 == id
                        || x.InssHijo3 == id
                        || x.InssHijo4 == id
                        )
                    .OrderByDescending(x => x.Id).FirstOrDefault(); 
                else
                    percapitaResult = _db.Percapitas.FirstOrDefault(x => x.Inss == id);     

                Customer result = null;
                if(percapitaResult == null)
                {
                    //buscar facultativo
                    result = _db.Customers.FirstOrDefault(x => x.Inss == id);
                }else
                {
                    result = _db.Customers.FirstOrDefault(x => x.Inss == percapitaResult.Inss);                    
                }

                
                // }else{
                //     result = _db.Customers.FirstOrDefault(x => x.Inss == id);

                // }

                if(result==null){
                    var beneficiary = _db.Beneficiaries.FirstOrDefault(x => x.InssAlternative == id);

                    if(beneficiary == null)
                        return BadRequest($"No se encontró el asegurado con el inss {inss}");

                    result = _db.Customers.FirstOrDefault(x => x.Inss == beneficiary.Inss);
                }

                if(result==null)
                    return BadRequest($"No se encontró el asegurado con el inss {inss}");

                var percapita = _db.Percapitas
                .Where(x => x.Inss == result.Inss)
                .OrderByDescending(x => x.Id).FirstOrDefault(); 

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
                    patronal = percapita == null ? "Facultativo" : percapita.Rason
                };
        }
    }
}
