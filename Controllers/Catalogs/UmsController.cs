using System;
using System.Collections.Generic;
using System.Linq;
using AtencionClinica.Factory;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace AtencionClinica.Controllers
{  
    public class UmsController : Controller
    {      
        private GenericFactory<UnitOfMeasure> factory = null;
        public UmsController(ClinicaContext db)
        {
            this.factory = new GenericFactory<UnitOfMeasure>(db);
        }

        [Route("api/ums/get")]
        public IActionResult Get(bool active){

            if(active)
                return Json(factory.GetAll(x => x.Active));
            
            return Json(factory.GetAll());
            
        } 
   

        [HttpPost("api/ums/post")]
        public IActionResult Post([FromBody] UnitOfMeasure model)
        {
            model.ToUpperCase();
            factory.InsertOrUpdateAndSave(model, x => x.Id == model.Id );
            return Json(model);

        }
      
        [HttpGet("api/ums/{id}/delete")]
        public IActionResult Delete(int id) {
            var model = factory.GetById(id);
            model.Active = false;
            factory.Save();
            return Json(new { n = id});
        }
    
    }
}
