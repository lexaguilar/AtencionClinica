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
    public class Cie10Controller : Controller
    {      
        private ClinicaContext _db = null;
        public Cie10Controller(ClinicaContext db)
        {
            this._db = db;
        }

        [Route("api/cie10/get")]
        public IActionResult Get(int skip, int take, IDictionary<string, string> values) 
        {
             IQueryable<Cie10> cie10 = _db.Cie10s;

            if (values.ContainsKey("name"))
            {
                var name = Convert.ToString(values["name"]);
                cie10 = cie10.Where(x => x.Name.Contains(name) || x.Id.Contains(name));
            }

            var items = cie10.Skip(skip).Take(take);

            return Json(new
            {
                items,
                totalCount = cie10.Count()
            });

        }     
    }
}
