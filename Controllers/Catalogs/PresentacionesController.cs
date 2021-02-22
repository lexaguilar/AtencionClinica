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
    public class PresentacionesController : Controller
    {      
        private GenericFactory<Presentation> factory = null;
        public PresentacionesController(ClinicaContext db)
        {
            this.factory = new GenericFactory<Presentation>(db);
        }

        [Route("api/presentaciones/get")]
        public IActionResult Get(bool active){

            if(active)
                return Json(factory.GetAll(x => x.Active));
            
            return Json(factory.GetAll());
            
        } 
   

        [HttpPost("api/presentaciones/post")]
        public IActionResult Post([FromBody] Presentation model)
        {
            model.ToUpperCase();
            factory.InsertOrUpdateAndSave(model, x => x.Id == model.Id );
            return Json(model);

        }
      
        [HttpGet("api/presentaciones/{id}/delete")]
        public IActionResult Delete(int id) {
            var model = factory.GetById(id);
            model.Active = false;
            factory.Save();
            return Json(new { n = id});
        }
    
    }
}
