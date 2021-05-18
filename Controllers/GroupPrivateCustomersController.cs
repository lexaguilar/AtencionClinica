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
    public class GroupPrivateCustomersController : Controller
    {
        private ClinicaContext _db = null;
        public GroupPrivateCustomersController(ClinicaContext db)
        {
            this._db = db;
        }
      

        [Route("api/group/{groupId}/privateCustomers/get")]
        public IActionResult Get(int groupId)
        {
            IQueryable<GroupProductPrivateCustumer> groupProducts = _db.GroupProductPrivateCustumers
           .Where(x => x.GroupId == groupId);

            return Json(groupProducts);

        }

        [HttpPost("api/group/{groupId}/privateCustomers/post")]
        public IActionResult Post([FromBody] GroupProductPrivateCustumer groupProduct)
        {

            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            if (groupProduct.Id > 0)
            {
                var oldService = _db.GroupProductPrivateCustumers.FirstOrDefault(x => x.Id == groupProduct.Id);

                oldService.CopyFrom(groupProduct, x => new
                {
                    x.GroupId,
                    x.PrivateCustomerId,
                });

                _db.SaveChanges();
            }
            else
            {
                var existe = _db.GroupProductPrivateCustumers.Any(x => x.GroupId == groupProduct.GroupId && x.PrivateCustomerId == groupProduct.PrivateCustomerId);
                if (!existe)
                {
                    _db.GroupProductPrivateCustumers.Add(groupProduct);
                    _db.SaveChanges();
                }
            }

            return Json(groupProduct);

        }

        //TODO no podes eliminar un servicio si ya tiene movimientos
        [HttpGet("api/group/{groupId}/privateCustomers/{id}/delete")]
        public IActionResult Delete(int id)
        {
            var groupProduct = _db.GroupProductPrivateCustumers.FirstOrDefault(x => x.Id == id);

            if (groupProduct != null)
            {
                _db.GroupProductPrivateCustumers.Remove(groupProduct);
                _db.SaveChanges();
            }

            return Json(new { n = id });
        }

    }
}
