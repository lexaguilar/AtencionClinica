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
    public class FollowsPrivates : Controller
    {      
        private ClinicaContext _db = null;
        public FollowsPrivates(ClinicaContext db)
        {
            this._db = db;
        }

        [Route("api/followsprivate/get/{areaId}")]
        public IActionResult Get(int areaId,int skip, int take, IDictionary<string, string> values) 
        {
            IQueryable<VwFollowsPrivate> follows = _db.VwFollowsPrivates.Where(x => x.AreaTargetId == areaId)
            .OrderByDescending(x => x.Id);

            if (values.ContainsKey("id"))
            {
                var id = Convert.ToInt32(values["id"]);
                follows = follows.Where(x => x.Id == id);
            }

            if (values.ContainsKey("billId"))
            {
                var billId = Convert.ToInt32(values["billId"]);
                follows = follows.Where(x => x.BillId == billId);
            }

            if (values.ContainsKey("billTypeId"))
            {
                var billTypeId = Convert.ToInt32(values["billTypeId"]);
                follows = follows.Where(x => x.BillTypeId == billTypeId);
            }

            if (values.ContainsKey("privateCustomerTypeId"))
            {
                var privateCustomerTypeId = Convert.ToInt32(values["privateCustomerTypeId"]);
                follows = follows.Where(x => x.PrivateCustomerTypeId == privateCustomerTypeId);
            }

            var items = follows.Skip(skip).Take(take);

            return Json(new
            {
                items,
                totalCount = follows.Count()
            });

        }      

        [HttpPost("api/followsprivate/post")]
        public IActionResult Post([FromBody] FollowsPrivate follow) 
        {
            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");
            
            var bill = _db.Bills.FirstOrDefault(x => x.Id == follow.BillId);

            if(!bill.Active)
                return BadRequest("No se puede porque la factura esta anulada");

             if(bill.Finished)
                return BadRequest("La factura ya no es valida porque ya ha sido egresado el paciente");
                
            follow.AreaSourceId = user.AreaId;
            follow.CreateAt = DateTime.Now;
            follow.CreateBy = user.Username;

            _db.FollowsPrivates.Add(follow);
         
            _db.SaveChanges();

            return Json(follow);

        }
    
    }
}
