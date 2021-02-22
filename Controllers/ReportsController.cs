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
using Microsoft.Extensions.Options;

namespace AtencionClinica.Controllers
{  
    [Authorize]
    public class ReportsController : Controller
    {      
        
        private ClinicaContext _db = null;
        public ReportsController(ClinicaContext db)
        {
            this._db = db;
        }

        [HttpGet("api/reports/kardex")]
        public IActionResult Get(int areaId, int productId)
        {

            var result = _db.VwKardices.Where(x => x.AreaId == areaId && x.ProductId == productId);            

            return Json(result);
        }

    }
}
