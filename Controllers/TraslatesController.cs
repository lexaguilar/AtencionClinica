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

        [HttpPost("api/traslates/post")]
        public IActionResult Post([FromBody] Traslate traslate)
        {            

            var user = this.GetAppUser();

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
                return BadRequest("No se puede anular el traslado");

            if (traslate != null)
            {
                traslate.StateId = 2;
                _db.SaveChanges();
            }

            return Json(new { n = id });
        }

    }
}
