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

            return Json(workOrder);

        }
        
        [HttpGet("api/workOrders/{id}/delete")]
        public IActionResult Delete(int id)
        {
            var inPutProducts = _db.InPutProducts.Include(x => x.InPutProductDetails).FirstOrDefault(x => x.Id == id);

            if (inPutProducts != null)
            {
                inPutProducts.StateId = 2;
                _db.SaveChanges();
            }

            return Json(new { n = id });
        }

        // [Route("api/workOrders/{id}/get/asServices")]
        // public IActionResult GetAsServices(int workId)
        // {
        // //     IQueryable<WorkOrderDetail> workOrders = _db.WorkOrderDetails.Where(x => x.WorkOrderId == workId && x.IsService)
        // //    .Select(x => new {


        // //    });

        // //     return Json(new
        // //     {
        // //         items,
        // //         totalCount = workOrders.Count()
        // //     });

        // }

    }
}
