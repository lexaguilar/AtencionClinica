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
    public class AreaServicesController : Controller
    {
        private ClinicaContext _db = null;
        public AreaServicesController(ClinicaContext db)
        {
            this._db = db;
        }

        [Route("api/area/{areaId}/services/get")]
        public IActionResult Get(int areaId)
        {
            IQueryable<AreaService> areaServices = _db.AreaServices
           .Where(x => x.AreaId == areaId);

            return Json(areaServices);

        }

        [HttpPost("api/area/{areaId}/services/post")]
        public IActionResult Post([FromBody] AreaService areaService)
        {

            var user = this.GetAppUser();

            if (areaService.Id > 0)
            {
                var oldService = _db.AreaServices.FirstOrDefault(x => x.Id == areaService.Id);

                oldService.CopyFrom(areaService, x => new
                {
                    x.AreaId,
                    x.ServiceId,
                });

                _db.SaveChanges();
            }
            else
            {
                var existe = _db.AreaServices.Any(x => x.ServiceId == areaService.ServiceId && x.AreaId == areaService.AreaId);
                if (!existe)
                {
                    _db.AreaServices.Add(areaService);
                    _db.SaveChanges();
                }
            }

            return Json(areaService);

        }

        //TODO no podes eliminar un servicio si ya tiene movimientos
        [HttpGet("api/area/{areaId}/services/{id}/delete")]
        public IActionResult Delete(int id)
        {
            var service = _db.AreaServices.FirstOrDefault(x => x.Id == id);

            if (service != null)
            {
                _db.AreaServices.Remove(service);
                _db.SaveChanges();
            }

            return Json(new { n = id });
        }

    }
}
