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
    public class FollowsController : Controller
    {      
        private ClinicaContext _db = null;
        public FollowsController(ClinicaContext db)
        {
            this._db = db;
        }

        [Route("api/follows/get/{areaId}")]
        public IActionResult Get(int areaId,int skip, int take, IDictionary<string, string> values) 
        {
            IQueryable<VwFollow> follows = _db.VwFollows.Where(x => x.AreaTargetId == areaId)
            .OrderByDescending(x => x.Id);

            if (values.ContainsKey("inss"))
            {
                var inss = Convert.ToInt32(values["inss"]);
                follows = follows.Where(x => x.Inss == inss);
            }

            if (values.ContainsKey("admissionId"))
            {
                var admissionId = Convert.ToInt32(values["admissionId"]);
                follows = follows.Where(x => x.AdmissionId == admissionId);
            }

            // if (values.ContainsKey("createAt"))
            // {
            //     var createAt = Convert.ToDateTime(values["createAt"]);
            //     admissions = admissions.Where(x => x.CreateAt > createAt && x.CreateAt < createAt.AddDays(1));
            // }

            var items = follows.Skip(skip).Take(take);

            return Json(new
            {
                items,
                totalCount = follows.Count()
            });

        }      

        [HttpPost("api/follows/post")]
        public IActionResult Post([FromBody] Admission admission) 
        {
            var user = this.GetAppUser();

         
            //_db.SaveChanges();

            return Json(admission);

        }
    
    }
}
