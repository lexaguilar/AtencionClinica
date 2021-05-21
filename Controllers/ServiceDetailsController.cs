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
    public class ServiceDetailsController : Controller
    {
        private ClinicaContext _db = null;
        public ServiceDetailsController(ClinicaContext db)
        {
            this._db = db;
        }

        [Route("api/service/{serviceId}/details/get")]
        public IActionResult Get(int serviceId)
        {
            IQueryable<ServiceDetail> serviceDetails = _db.ServiceDetails
           .Where(x => x.ServiceId == serviceId);

            return Json(serviceDetails);

        }

        [HttpPost("api/service/{serviceId}/details/post")]
        public IActionResult Post([FromBody] ServiceDetail serviceDetail)
        {

            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            if (serviceDetail.Id > 0)
            {
                var oldService = _db.ServiceDetails.FirstOrDefault(x => x.Id == serviceDetail.Id);

                if(string.IsNullOrEmpty(serviceDetail.Um)) serviceDetail.Um = "";
                if(string.IsNullOrEmpty(serviceDetail.Reference)) serviceDetail.Reference = "";

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
               
               if(string.IsNullOrEmpty(serviceDetail.Um)) serviceDetail.Um = "";
               if(string.IsNullOrEmpty(serviceDetail.Reference)) serviceDetail.Reference = "";

                _db.ServiceDetails.Add(serviceDetail);
                _db.SaveChanges();
                
            }

            return Json(serviceDetail);

        }

        //TODO no podes eliminar un servicio si ya tiene movimientos
        [HttpGet("api/service/{serviceId}/details/{id}/delete")]
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
