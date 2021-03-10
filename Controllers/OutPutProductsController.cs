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
    public class OutPutProductsController : Controller
    {
        private ClinicaContext _db = null;
        private IProductServices<OutPutProduct> _service;
        public OutPutProductsController(ClinicaContext db, IProductServices<OutPutProduct> service)
        {
            this._db = db;
            _service = service;
        }

        [Route("api/outputproducts/get")]
        public IActionResult Get(int skip, int take, IDictionary<string, string> values)
        {

            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La información del usuario cambio, inicie sesion nuevamente");

            IQueryable<OutPutProduct> outPutProduct = _db.OutPutProducts.Where(x => x.AreaId == user.AreaId)
           .OrderByDescending(x => x.Id);            

            if (values.ContainsKey("typeId"))
            {
                var typeId = Convert.ToInt32(values["typeId"]);
                outPutProduct = outPutProduct.Where(x => x.TypeId == typeId);
            }

            if (values.ContainsKey("reference"))
            {
                var reference = Convert.ToString(values["reference"]);
                outPutProduct = outPutProduct.Where(x => x.Reference == reference);
            }

            var items = outPutProduct.Skip(skip).Take(take);

            return Json(new
            {
                items,
                totalCount = outPutProduct.Count()
            });

        }

        [HttpPost("api/outputproducts/post")]
        public IActionResult Post([FromBody] OutPutProduct outPutProduct)
        {            

            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            if (outPutProduct.Id == 0)
            {

                outPutProduct.CreateBy = user.Username;                

                var result = _service.Create(outPutProduct);

                if(!result.IsValid)
                    return BadRequest(result.Error);
                
            }
            else
            {
                var result = _service.Update(outPutProduct);

                if(!result.IsValid)
                    return BadRequest(result.Error);
            }

            _db.SaveChanges();

            return Json(outPutProduct);

        }
        
        [HttpGet("api/outputproducts/{id}/delete")]
        public IActionResult Delete(int id)
        {
            var outPutProduct = _db.OutPutProducts.Include(x => x.OutPutProductDetails).FirstOrDefault(x => x.Id == id);            

            _service.Revert(outPutProduct);

            _db.SaveChanges();            

            return Json(new { n = id });
        }

    }
}
