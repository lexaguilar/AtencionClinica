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
    public class GroupProductDaysController : Controller
    {
        private ClinicaContext _db = null;
        public GroupProductDaysController(ClinicaContext db)
        {
            this._db = db;
        }
      

        [Route("api/group/{groupId}/days/get")]
        public IActionResult Get(int groupId)
        {
            IQueryable<GroupProductsByDay> groupProducts = _db.GroupProductsByDays
           .Where(x => x.GroupId == groupId);

            return Json(groupProducts);

        }

        [HttpPost("api/group/{groupId}/days/post")]
        public IActionResult Post([FromBody] GroupProductsByDay groupProduct)
        {

            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            if (groupProduct.Id > 0)
            {
                var oldService = _db.GroupProductsByDays.FirstOrDefault(x => x.Id == groupProduct.Id);

                oldService.CopyFrom(groupProduct, x => new
                {
                    x.GroupId,
                    x.DayOfWeek,
                });

                _db.SaveChanges();
            }
            else
            {
                var existe = _db.GroupProductsByDays.Any(x => x.GroupId == groupProduct.GroupId && x.DayOfWeek == groupProduct.DayOfWeek);
                if (!existe)
                {
                    _db.GroupProductsByDays.Add(groupProduct);
                    _db.SaveChanges();
                }
            }

            return Json(groupProduct);

        }

        //TODO no podes eliminar un servicio si ya tiene movimientos
        [HttpGet("api/group/{groupId}/days/{id}/delete")]
        public IActionResult Delete(int id)
        {
            var groupProduct = _db.GroupProductsByDays.FirstOrDefault(x => x.Id == id);

            if (groupProduct != null)
            {
                _db.GroupProductsByDays.Remove(groupProduct);
                _db.SaveChanges();
            }

            return Json(new { n = id });
        }

    }
}
