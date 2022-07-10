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

        [Route("api/[Controller]/get/{id}")]
        public IActionResult Get(int id)
        {
             var result = _db.OutPutProducts.Include(x => x.OutPutProductDetails).FirstOrDefault(x => x.Id == id);
            return Json(result);
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

             if (values.ContainsKey("id"))
            {
                var id = Convert.ToInt32(values["id"]);
                outPutProduct = outPutProduct.Where(x => x.Id == id);
            }

            if (values.ContainsKey("createAt"))
            {
                var createAt = Convert.ToDateTime(values["createAt"]);
                var createAtEnd = Convert.ToDateTime(values["createAtEnd"]);
                outPutProduct = outPutProduct.Where(x => x.Date >= createAt && x.Date < createAtEnd);
            }

            if(values.ContainsKey("areaId")){
                var areaId = Convert.ToInt32(values["areaId"]);
                outPutProduct = outPutProduct.Where(x => x.AreaId == areaId);
            }
            var totalCount = outPutProduct.Count();

            if (values.ContainsKey("requireTotalCount"))
            {
               var requireTotalCount = Convert.ToBoolean(values["requireTotalCount"]);
                if (requireTotalCount){
                        outPutProduct = outPutProduct.Skip(skip).Take(take);                
                }
            }

            return Json(new
            {
                items = outPutProduct,
                totalCount
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

                foreach (var item in outPutProduct.OutPutProductDetails)
                {

                    var areaProducto = _db.AreaProductStocks.FirstOrDefault(x => x.AreaId == outPutProduct.AreaId && x.ProductId == item.ProductId);
                    item.CostAvg = areaProducto.CostAvg;                    

                }             

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
