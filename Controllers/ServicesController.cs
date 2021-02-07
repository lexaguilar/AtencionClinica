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

namespace AtencionClinica.Controllers
{
    public class ServicesController : Controller
    {
        private ClinicaContext _db = null;
        public ServicesController(ClinicaContext db)
        {
            this._db = db;
        }

        [Route("api/services/get")]
        public IActionResult Get(int skip, int take, IDictionary<string, string> values)
        {
            IQueryable<Service> services = _db.Services
           .OrderByDescending(x => x.Id);

            if (values.ContainsKey("id"))
            {
                var id = Convert.ToInt32(values["id"]);
                services = services.Where(x => x.Id == id);
            }

            if (values.ContainsKey("name"))
            {
                var name = Convert.ToString(values["name"]);
                services = services.Where(x => x.Name.StartsWith(name));
            }

            var items = services.Skip(skip).Take(take);

            return Json(new
            {
                items,
                totalCount = services.Count()
            });

        }

        [Route("api/services/area/{areaId}/get")]
        public IActionResult Get(int areaId)
        {
           var result = _db.AreaServices.Include(x => x.Service).Where(x => x.AreaId == areaId && x.Service.Active).Select(x => x.Service);

           return Json(result);

        }

        [HttpPost("api/services/post")]
        public IActionResult Post([FromBody] Service service)
        {

            

            var user = this.GetAppUser();

            if (service.Id > 0)
            {
                var oldService = _db.Services.FirstOrDefault(x => x.Id == service.Id);

                oldService.CopyFrom(service, x => new
                {
                    x.Name,
                    x.Price,
                    x.PriceCalculate,
                    x.Active
                });

                _db.SaveChanges();
            }
            else
            {
                var existe = _db.Services.Any(x => x.Name == service.Name);

                if (existe)
                    return BadRequest($"Ya existe un servicio con el nombre {service.Name}");

                service.Active = true;
                _db.Services.Add(service);
                _db.SaveChanges();
            }

            return Json(service);

        }

        //TODO no podes eliminar un servicio si ya tiene movimientos
        [HttpGet("api/services/{id}/delete")]
        public IActionResult Delete(int id)
        {
            var service = _db.Services.FirstOrDefault(x => x.Id == id);

            if (service != null)
            {
                service.Active = false;
                _db.SaveChanges();
            }

            return Json(new { n = id });
        }

    }
}
