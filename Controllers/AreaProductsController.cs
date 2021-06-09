using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AtencionClinica.Extensions;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace AtencionClinica.Controllers
{
    [Authorize]
    public class AreaProductsController : Controller
    {
        private ClinicaContext _db = null;
        public AreaProductsController(ClinicaContext db)
        {
            this._db = db;
        }

        [Route("api/area/{areaId}/products/get")]
        public IActionResult Get(int areaId)
        {
            IQueryable<AreaProductStock> areaProducts = _db.AreaProductStocks.Include(x => x.Product)
           .Where(x => x.AreaId == areaId);

            return Json(areaProducts);

        }

        [Route("api/area/{areaId}/products/get/{id}")]
        public IActionResult Get(int areaId, int id)
        {
            var areaProduct = _db.AreaProductStocks.Include(x => x.Product)
           .FirstOrDefault(x => x.AreaId == areaId && x.ProductId == id);

            return Json(areaProduct);

        }

        [HttpPost("api/area/{areaId}/products/post")]
        public IActionResult Post(int areaId, [FromBody] AreaProductStock model)
        {

            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

           
            var oldService = _db.AreaProductStocks.FirstOrDefault(x => x.AreaId == areaId && x.ProductId == model.ProductId);

            oldService.CopyFrom(model, x => new
            {
                x.Inherit,
                x.StockMin
            });

            _db.SaveChanges();
                   

            return Json(model);

        }

    }
}
