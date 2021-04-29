using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AtencionClinica.Extensions;
using AtencionClinica.Models;
using AtencionClinica.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace AtencionClinica.Controllers
{
    [Authorize]
    public class WorkOrdersController : Controller
    {
        private ClinicaContext _db = null;
        
        private IProductServices<WorkOrder> _service;
        public WorkOrdersController(ClinicaContext db, IProductServices<WorkOrder> service)
        {
            this._db = db;
            _service = service;
        }

        [Route("api/workOrders/get")]
        public IActionResult Get(int followId, int skip, int take)
        {
            IQueryable<WorkOrder> workOrders = _db.WorkOrders.Where(x => x.FollowId == followId)
           .OrderByDescending(x => x.Id);            

            var items = workOrders.Skip(skip).Take(take);

            return Json(new
            {
                items,
                totalCount = workOrders.Count()
            });

        }

        [HttpPost("api/workOrders/post")]
        public IActionResult Post([FromBody] WorkOrder workOrder,[FromQuery]int followId)
        {            

            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            if (workOrder.Id == 0)
            {

                workOrder.CreateBy = user.Username;

                var result = _service.Create(workOrder);

                if(!result.IsValid)
                   return BadRequest(result.Error);

                
            }            

            var workPreOrders = _db.WorkPreOrders.FirstOrDefault(x => x.FollowId == followId);
            if(workPreOrders != null)
                workPreOrders.Used = true;            

            _db.SaveChanges();

            var lastOutPutProduct = _db.OutPutProducts.OrderByDescending(x=> x.Id).FirstOrDefault(x => x.CreateBy == user.Username && x.AreaId == user.AreaId);
            
            if(lastOutPutProduct != null){

                lastOutPutProduct.Reference = workOrder.Id.ToString();
                _db.SaveChanges();
            }

            return Json(workOrder);

        }
    }
}
