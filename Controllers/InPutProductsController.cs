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
    public class InPutProductsController : Controller
    {
        private ClinicaContext _db = null;
        public InPutProductsController(ClinicaContext db)
        {
            this._db = db;
        }

        [Route("api/inputproducts/get")]
        public IActionResult Get(int skip, int take, IDictionary<string, string> values)
        {
            IQueryable<InPutProduct> inPutProducts = _db.InPutProducts
           .OrderByDescending(x => x.Number);

            if (values.ContainsKey("number"))
            {
                var number = Convert.ToInt32(values["number"]);
                inPutProducts = inPutProducts.Where(x => x.Number == number);
            }

            if (values.ContainsKey("areaId"))
            {
                var areaId = Convert.ToInt32(values["areaId"]);
                inPutProducts = inPutProducts.Where(x => x.AreaId == areaId);
            }

            if (values.ContainsKey("typeId"))
            {
                var typeId = Convert.ToInt32(values["typeId"]);
                inPutProducts = inPutProducts.Where(x => x.TypeId == typeId);
            }

            if (values.ContainsKey("sourceId"))
            {
                var sourceId = Convert.ToInt32(values["sourceId"]);
                inPutProducts = inPutProducts.Where(x => x.SourceId == sourceId);
            }

            var items = inPutProducts.Skip(skip).Take(take);

            return Json(new
            {
                items,
                totalCount = inPutProducts.Count()
            });

        }

        [Route("api/inputproducts/area/{areaId}/get")]
        public IActionResult Get(int areaId)
        {
           var result = _db.AreaServices.Include(x => x.Service).Where(x => x.AreaId == areaId).Select(x => x.Service);

           return Json(result);

        }

        [HttpPost("api/inputproducts/post")]
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
        [HttpGet("api/inputproducts/{id}/delete")]
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
