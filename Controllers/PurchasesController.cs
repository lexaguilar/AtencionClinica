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
    public class PurchasesController : Controller
    {
        private ClinicaContext _db = null;
        //private IProductServices<InPutProduct> _service;
        public PurchasesController(ClinicaContext db)
        {
            this._db = db;
            //_service = service;
        }

         [Route("api/[Controller]/get/{id}")]

        public IActionResult GetById(int id)
        {
            var result = _db.Purchases.Include(x => x.PurchaseDetails).FirstOrDefault(x => x.Id == id);
            return Json(result);
        }

        [Route("api/[Controller]/get")]
        public IActionResult Get(int skip, int take, IDictionary<string, string> values)
        {

            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            IQueryable<Purchase> purchases = _db.Purchases.Where(x => x.AreaId == user.AreaId)
           .OrderByDescending(x => x.Id);            

            

            if (values.ContainsKey("reference"))
            {
                var reference = Convert.ToString(values["reference"]);
                purchases = purchases.Where(x => x.Reference == reference);
            }

            var items = purchases.Skip(skip).Take(take);

            return Json(new
            {
                items,
                totalCount = purchases.Count()
            });

        }

        [Route("api/[Controller]/area/{areaId}/get")]
        public IActionResult Get(int areaId)
        {
           var result = _db.AreaServices.Include(x => x.Service).Where(x => x.AreaId == areaId).Select(x => x.Service);

           return Json(result);

        }

        [HttpPost("api/[Controller]/post")]
        public IActionResult Post([FromBody] InPutProduct inPutProduct)
        {            

            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            if (inPutProduct.Id == 0)
            {

                inPutProduct.CreateBy = user.Username;                

                // var result = BadRequest();//  _service.Create(inPutProduct);

                // if(!result.IsValid)
                //     return BadRequest(result.Error);
                
            }
            else
            {
                // var result =BadRequest(); //_service.Update(inPutProduct);

                // if(!result.IsValid)
                //     return BadRequest(result.cleanError);
            }

            _db.SaveChanges();

            return Json(inPutProduct);

        }
        
        [HttpGet("api/[Controller]/{id}/delete")]
        public IActionResult Delete(int id)
        {
            var inPutProduct = _db.Purchases.Include(x => x.PurchaseDetails).FirstOrDefault(x => x.Id == id);            

            //_service.Revert(inPutProduct);

            _db.SaveChanges();            

            return Json(new { n = id });
        }

    }
}
