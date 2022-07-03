using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AtencionClinica.Extensions;
using AtencionClinica.Factory;
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
        private ProductsFactory factory = null;
        private ServicesFactory serviceFactory = null;
        public AreaServicesController(ClinicaContext db)
        {
            this._db = db;
            factory = new ProductsFactory(this._db);
            serviceFactory = new ServicesFactory(this._db);
        }

        [Route("api/area/{areaId}/services/products/get")]
        public IActionResult GetServicesProducts(int areaId, bool active, bool exists, bool has,int skip, int take, IDictionary<string, string> values)
        {
            
            var products = factory.GetByArea(areaId, active, exists, has);
            var services = serviceFactory.GetByArea(areaId, active);

            return Json(new { 
                products,
                services 
            });

        }

        [Route("api/area/{areaId}/services/get")]
        public IActionResult Get(int areaId)
        {
            IQueryable<AreaService> areaServices = _db.AreaServices.Include(x => x.Service)            
           .Where(x => x.AreaId == areaId);

            return Json(areaServices.Select(x => 
            new { 
                x.Id, 
                x.AreaId,
                x.ServiceId,
                Service = x.Service.Name                 
            }));

        }

        [HttpPost("api/area/{areaId}/services/post")]
        public IActionResult Post([FromBody] AreaService areaService)
        {

            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

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
