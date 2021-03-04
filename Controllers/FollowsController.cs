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
        public IActionResult Post([FromBody] Follow follow) 
        {
            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            var admission = _db.Admissions.FirstOrDefault(x => x.Id == follow.AdmissionId);

            if(!admission.Active)
                return BadRequest("No se puede porque la admision esta anulada");

             if(admission.Finished)
                return BadRequest("La admision ya no esta valida porque ya ha sido egresado el paciente");
                
            follow.AreaSourceId = user.AreaId;
            follow.CreateAt = DateTime.Now;
            follow.CreateBy = user.Username;

            _db.Follows.Add(follow);
         
            _db.SaveChanges();

            return Json(follow);

        }
    
    }
}
