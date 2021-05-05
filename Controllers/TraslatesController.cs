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
    public class TraslatesController : Controller
    {
        private ClinicaContext _db = null;
        
        private IProductServices<Traslate> _service;
        public TraslatesController(ClinicaContext db, IProductServices<Traslate> service)
        {
            this._db = db;
            _service = service;
        }

        [Route("api/traslates/get")]
        public IActionResult Get(int areaId, int skip, int take, IDictionary<string, string> values)
        {

            IQueryable<Traslate> inPutProducts = _db.Traslates
           .OrderByDescending(x => x.Id);

            if (values.ContainsKey("id"))
            {
                var id = Convert.ToInt32(values["id"]);
                inPutProducts = inPutProducts.Where(x => x.Id == id);
            }

            if (values.ContainsKey("areaSourceId"))
            {
                var areaSourceId = Convert.ToInt32(values["areaSourceId"]);
                inPutProducts = inPutProducts.Where(x => x.AreaSourceId == areaSourceId);
            }

            if (values.ContainsKey("areaTargetId"))
            {
                var areaTargetId = Convert.ToInt32(values["areaTargetId"]);
                inPutProducts = inPutProducts.Where(x => x.AreaTargetId == areaTargetId);
            }
            

            if (values.ContainsKey("stateId"))
            {
                var stateId = Convert.ToInt32(values["stateId"]);
                inPutProducts = inPutProducts.Where(x => x.StateId == stateId);
            }

            if (values.ContainsKey("stageId"))
            {
                var stageId = Convert.ToInt32(values["stageId"]);
                inPutProducts = inPutProducts.Where(x => x.StageId == stageId);
            }

            var items = inPutProducts.Skip(skip).Take(take);

            return Json(new
            {
                items,
                totalCount = inPutProducts.Count()
            });

        }

        // [Route("api/traslates/area/{areaId}/get")]
        // public IActionResult Get(int areaId)
        // {
        //    var result = _db.AreaServices.Include(x => x.Service).Where(x => x.AreaId == areaId).Select(x => x.Service);

        //    return Json(result);

        // }

        [Route("api/traslates/get/{id}")]
        public IActionResult GetById(int id)
        {
           var result = _service.GetById(id);

           return Json(result);

        }

        

        [HttpPost("api/[Controller]/post/asEdit")]
        public IActionResult Edit([FromBody] Traslate traslate)
        { 
            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La información del usuario cambio, inicie sesión nuevamente");

            var oldTraslate = _db.Traslates.FirstOrDefault(x => x.Id == traslate.Id);

            if(oldTraslate.StageId == (int)TraslateStages.Anulado)
                return BadRequest("La solicitud esta anulada, no se puede editar");

            if(oldTraslate.StageId == (int)TraslateStages.Procesado)
                return BadRequest("La solicitud esta despachada, no se puede editar");

            if(traslate.StateId != 1)
                return BadRequest("No se puede editar el traslado ya que la solicitud esta anulada");

            oldTraslate.CopyFrom(traslate, x=> new 
            { 
                x.AreaSourceId,
                x.Observation,
                x.Date                
            });

            var oldTraslateDetails = _db.TraslateDetails.Where(x => x.TraslateId == traslate.Id);

            foreach (var item in oldTraslateDetails)
            {
                _db.TraslateDetails.Remove(item);
            }

            foreach (var item in traslate.TraslateDetails)
            {             
                var newItem = new TraslateDetail();

                 var product = _db.AreaProductStocks.FirstOrDefault(x => x.AreaId == traslate.AreaSourceId && x.ProductId == item.ProductId);

                item.SubTotal = Math.Round((Convert.ToDecimal(item.QuantityRequest) * item.Cost), 6);
                item.Discount = 0;
                item.QuantityResponse = 0;
                item.Import = item.SubTotal - item.Discount;
                item.Total = item.Import + item.Iva;
                item.Price = product.Price;
                item.CostAvg = item.Cost;

                newItem.CopyFrom(item, x => new {
                    x.ProductId,
                    x.QuantityRequest,
                    x.QuantityResponse,
                    x.Cost,
                    x.Price,
                    x.SubTotal,
                    x.Discount,
                    x.Import,
                    x.Iva,
                    x.Total,
                    x.CostAvg,
                    x.Stocks,                   
                });

                newItem.TraslateId = traslate.Id;               

                _db.TraslateDetails.Add(newItem);
            }   

            _db.SaveChanges();

            return Json(traslate);

        }

        

        [HttpPost("api/traslates/post")]
        public IActionResult Post([FromBody] Traslate traslate)
        {            

            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            if (traslate.Id == 0)
            {

                traslate.CreateBy = user.Username;                          
                traslate.AreaTargetId = user.AreaId;                

                var result = _service.Create(traslate);

                if(!result.IsValid)
                   return BadRequest(result.Error);
                
            }
            else
            {
                traslate.LastModificationBy = user.Username;     
                var result = _service.Update(traslate);

                if(!result.IsValid)
                   return BadRequest(result.Error);

            }

            _db.SaveChanges();

            return Json(traslate);

        }
        
        [HttpGet("api/traslates/{id}/delete")]
        public IActionResult Delete(int id)
        {
            var traslate = _db.Traslates.FirstOrDefault(x => x.Id == id);

            if(traslate.StateId != 1)
                return BadRequest("No se puede anular el traslado");

            if(traslate.StageId != 1)
                return BadRequest("No se puede anular un traslado que ya esta procesado");

            if (traslate != null)
            {
                traslate.StateId = 2;
                traslate.StageId = (int)TraslateStages.Anulado;
                _db.SaveChanges();
            }

            return Json(new { n = id });
        }

    }
}
