using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AtencionClinica.Extensions;
using AtencionClinica.Factory;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace AtencionClinica.Controllers
{
    [Authorize]
    public class GroupProductsController : Controller
    {
        private ClinicaContext _db = null;
        public GroupProductsController(ClinicaContext db)
        {
            this._db = db;
        }
      

        [Route("api/group/{groupId}/products/get")]
        public IActionResult Get(int groupId)
        {
            IQueryable<GroupProduct> groupProducts = _db.GroupProducts
           .Where(x => x.GroupId == groupId);

            return Json(groupProducts);

        }

        [HttpPost("api/group/{groupId}/products/post")]
        public IActionResult Post([FromBody] GroupProduct groupProduct)
        {

            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            if (groupProduct.Id > 0)
            {
                var oldService = _db.GroupProducts.FirstOrDefault(x => x.Id == groupProduct.Id);

                oldService.CopyFrom(groupProduct, x => new
                {
                    x.GroupId,
                    x.ProductId,
                    x.Quantity,
                });

                _db.SaveChanges();
            }
            else
            {
                var existe = _db.GroupProducts.Any(x => x.GroupId == groupProduct.GroupId && x.ProductId == groupProduct.ProductId);
                if (!existe)
                {
                    _db.GroupProducts.Add(groupProduct);
                    _db.SaveChanges();
                }
            }

            return Json(groupProduct);

        }

        //TODO no podes eliminar un servicio si ya tiene movimientos
        [HttpGet("api/group/{groupId}/products/{id}/delete")]
        public IActionResult Delete(int id)
        {
            var groupProduct = _db.GroupProducts.FirstOrDefault(x => x.Id == id);

            if (groupProduct != null)
            {
                _db.GroupProducts.Remove(groupProduct);
                _db.SaveChanges();
            }

            return Json(new { n = id });
        }

    }
}
