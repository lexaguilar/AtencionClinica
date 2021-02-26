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
    public class InPutProductsController : Controller
    {
        private ClinicaContext _db = null;
        private IProductServices<InPutProduct> _service;
        public InPutProductsController(ClinicaContext db, IProductServices<InPutProduct> service)
        {
            this._db = db;
            _service = service;
        }

        [Route("api/inputproducts/get")]
        public IActionResult Get(int skip, int take, IDictionary<string, string> values)
        {

            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            IQueryable<InPutProduct> inPutProducts = _db.InPutProducts.Where(x => x.AreaId == user.AreaId)
           .OrderByDescending(x => x.Id);            

            if (values.ContainsKey("typeId"))
            {
                var typeId = Convert.ToInt32(values["typeId"]);
                inPutProducts = inPutProducts.Where(x => x.TypeId == typeId);
            }

            if (values.ContainsKey("reference"))
            {
                var reference = Convert.ToString(values["reference"]);
                inPutProducts = inPutProducts.Where(x => x.Reference == reference);
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

            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            if (inPutProduct.Id == 0)
            {

                inPutProduct.CreateBy = user.Username;                

                var result = _service.Create(inPutProduct);

                if(!result.IsValid)
                    return BadRequest(result.Error);
                
            }
            else
            {
                var result = _service.Update(inPutProduct);

                if(!result.IsValid)
                    return BadRequest(result.Error);
            }

            _db.SaveChanges();

            return Json(inPutProduct);

        }
        
        [HttpGet("api/inputproducts/{id}/delete")]
        public IActionResult Delete(int id)
        {
            var inPutProduct = _db.InPutProducts.Include(x => x.InPutProductDetails).FirstOrDefault(x => x.Id == id);            

            _service.Revert(inPutProduct);

            _db.SaveChanges();            

            return Json(new { n = id });
        }

    }
}
