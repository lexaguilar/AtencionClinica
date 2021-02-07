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
        public IActionResult Get(bool active){

            if(active)
                return Json(factory.GetAll(x => x.Active));
            
            return Json(factory.GetAll());
            
        } 

        [HttpPost("api/areas/post")]
        public IActionResult Post([FromBody] Area area)
        {
            area.ToUpperCase();
            factory.InsertOrUpdateAndSave(area, x => x.Id == area.Id );
            return Json(area);

        }
      
        [HttpGet("api/areas/{id}/delete")]
         public IActionResult Delete(int id) {
            var model = factory.GetById(id);
            model.Active = false;
            factory.Save();
            return Json(new { n = id});
        }
    
    }
}
