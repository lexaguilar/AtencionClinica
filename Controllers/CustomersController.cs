using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using static AtencionClinica.Enumerators;

namespace AtencionClinica.Controllers
{  
    public class CustomersController : Controller
    {      
        private ClinicaContext _db = null;
        public CustomersController(ClinicaContext db)
        {
            this._db = db;
        }

        [Route("api/customers/get")]
        public IActionResult Get(int year, int month) 
        {
            var result = _db.Customers;

            return Json(result);
        }

        [Route("api/customers/get/{inss}")]
        public IActionResult GetById(int inss) 
        {
            var result = _db.Customers.FirstOrDefault(x => x.Inss == inss);

            if(result==null)
                return BadRequest($"No se encontró el asegurado con el inss {inss}");

            return Json(result);
        } 
    }
}
