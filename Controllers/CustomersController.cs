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

                if(result==null)
                    return BadRequest($"No se encontró el asegurado con el inss {inss}");

                return Json(result);
            }else{

                var customer = _db.Customers.FirstOrDefault(x => x.Identification == inss);

                if(customer != null)
                    id = customer.Inss;
                else
                    return BadRequest($"No se encontró el asegurado con el identificador {inss}");

                var result = _db.Customers.FirstOrDefault(x => x.Inss == id);                   

                return Json(result);
            }
        } 
    }
}
