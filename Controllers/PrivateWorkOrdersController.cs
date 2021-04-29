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
    public class PrivateWorkOrdersController : Controller
    {
        private ClinicaContext _db = null;
        
        private IProductServices<PrivateWorkOrder> _service;
        public PrivateWorkOrdersController(ClinicaContext db, IProductServices<PrivateWorkOrder> service)
        {
            this._db = db;
            _service = service;
        }

        [Route("api/privateWorkOrders/get")]
        public IActionResult Get(int followId, int skip, int take)
        {
            
            IQueryable<PrivateWorkOrder> workOrders = _db.PrivateWorkOrders.Where(x => x.FollowsPrivateId == followId)
           .OrderByDescending(x => x.Id);            

            var items = workOrders.Skip(skip).Take(take);

            return Json(new
            {
                items,
                totalCount = workOrders.Count()
            });

        }

        [HttpPost("api/privateWorkOrders/post")]
        public IActionResult Post([FromBody] PrivateWorkOrder workOrder,[FromQuery]int followId)
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
