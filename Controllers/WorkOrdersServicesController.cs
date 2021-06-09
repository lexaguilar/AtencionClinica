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

namespace AtencionClinica.Controllers
{
    [Authorize]
    public class WorkOrdersServicesController : Controller
    {
        private ClinicaContext _db = null;
        public WorkOrdersServicesController(ClinicaContext db)
        {
            this._db = db;
        }

        [Route("api/workOrdersServices/{workId}/get")]
        public IActionResult Get(int workId)
        {
            IQueryable<WorkOrderDetail> serviceDetails = _db.WorkOrderDetails
           .Where(x => x.WorkOrderId == workId);

            return Json(serviceDetails);

        }

        [HttpPost("api/workOrdersServices/{workId}/post")]
        public IActionResult Post([FromBody] ServiceDetail serviceDetail)
        {

            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            if (serviceDetail.Id > 0)
            {
                var oldService = _db.ServiceDetails.FirstOrDefault(x => x.Id == serviceDetail.Id);

                oldService.CopyFrom(serviceDetail, x => new
                {
                    x.Name,
                    x.Um,
                    x.Reference,
                });

                _db.SaveChanges();
            }
            else
            {
               
                _db.ServiceDetails.Add(serviceDetail);
                _db.SaveChanges();
                
            }

            return Json(serviceDetail);

        }

        //TODO no podes eliminar un servicio si ya tiene movimientos
        [HttpGet("api/workOrdersServices/{workId}/{id}/delete")]
        public IActionResult Delete(int id)
        {
            var service = _db.ServiceDetails.FirstOrDefault(x => x.Id == id);

            if (service != null)
            {
                _db.ServiceDetails.Remove(service);
                _db.SaveChanges();
            }

            return Json(new { n = id });
        }

    }
}
