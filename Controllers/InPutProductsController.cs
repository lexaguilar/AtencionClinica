using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AtencionClinica.Extensions;
using AtencionClinica.Models;
using AtencionClinica.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace AtencionClinica.Controllers
{
    public class InPutProductsController : Controller
    {
        private ClinicaContext _db = null;
        private IInPutProductServices _service;
        public InPutProductsController(ClinicaContext db, IInPutProductServices service)
        {
            this._db = db;
            _service = service;
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
        public IActionResult Post([FromBody] InPutProduct inPutProduct)
        {            

            var user = this.GetAppUser();


            if (inPutProduct.Id == 0)
            {

                inPutProduct.CreateBy = user.Username;                

                _service.Create(inPutProduct);

                
            }
            else
            {
                
            }

            return Json(inPutProduct);

        }
        
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
