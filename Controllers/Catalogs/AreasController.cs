using System;
using System.Collections.Generic;
using System.Linq;
using AtencionClinica.Factory;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace AtencionClinica.Controllers
{  
    public class AreasController : Controller
    {      
        private GenericFactory<Area> factory = null;
        public AreasController(ClinicaContext db)
        {
            this.factory = new GenericFactory<Area>(db);
        }

        [Route("api/areas/get")]
        public IActionResult Get() => Json(factory.GetAll());       

        [HttpPost("api/areas/post")]
        public IActionResult Post([FromBody] Area area)
        {
            area.ToUpperCase();
            factory.InsertOrUpdateAndSave(area, x => x.Id == area.Id );
            return Json(area);

        }
      
        [HttpGet("api/areas/{id}/delete")]
        public IActionResult Delete(int id) => Json(new { n = factory.DeleteAndSave(id) });
    
    }
}
