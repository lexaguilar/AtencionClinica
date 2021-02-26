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
    public class FamiliasController : Controller
    {      
        private GenericFactory<Family> factory = null;
        public FamiliasController(ClinicaContext db)
        {
            this.factory = new GenericFactory<Family>(db);
        }

        [Route("api/familias/get")]
        public IActionResult Get(bool active){

            if(active)
                return Json(factory.GetAll(x => x.Active));
            
            return Json(factory.GetAll());
            
        } 

        [HttpPost("api/familias/post")]
        public IActionResult Post([FromBody] Family model)
        {
            model.ToUpperCase();
            factory.InsertOrUpdateAndSave(model, x => x.Id == model.Id );
            return Json(model);

        }
      
        [HttpGet("api/familias/{id}/delete")]
        public IActionResult Delete(int id) {
            var model = factory.GetById(id);
            model.Active = false;
            factory.Save();
            return Json(new { n = id});
        }
    
    }
}
