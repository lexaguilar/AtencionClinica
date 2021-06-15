using System;
using System.Collections.Generic;
using System.Linq;
using AtencionClinica.Factory;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace AtencionClinica.Controllers
{
    [Authorize]
    public class TiposController : Controller
    {
        private GenericFactory<ServiceType> factory = null;
        private ClinicaContext _db = null;

        public TiposController(ClinicaContext db)
        {
            this.factory = new GenericFactory<ServiceType>(db);
            _db = db;
        }

        [Route("api/tipos/get")]
        public IActionResult Get(bool active)
        {

            return Json(factory.GetAll());

        }

        [HttpPost("api/tipos/post")]
        public IActionResult Post([FromBody] ServiceType model)
        {

            model.Name = model.Name.Trim().ToUpper();

            if (model.Id == 0)
            {
                var groups = _db.ServiceTypes.FirstOrDefault();
                if (groups == null)
                    model.Id = 1;
                else
                {
                    var groupIdMax = _db.ServiceTypes.Select(x => x.Id).Max();
                    model.Id = groupIdMax + 1;
                }
            }


            factory.InsertOrUpdateAndSave(model, x => x.Id == model.Id);
            return Json(model);

        }

        [HttpGet("api/tipos/{id}/delete")]
        public IActionResult Delete(int id)
        {

            var servicesType = _db.ServiceTypes.First(x => x.Id == id);
            if (servicesType != null)
            {
                _db.ServiceTypes.Remove(servicesType);
                _db.SaveChanges();
            }

            return Json(new { n = id });

        }

    }
}
