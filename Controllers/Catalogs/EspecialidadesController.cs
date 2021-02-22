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
    public class EspecialidadesController : Controller
    {      
        private GenericFactory<Specialty> factory = null;
        public EspecialidadesController(ClinicaContext db)
        {
            this.factory = new GenericFactory<Specialty>(db);
        }

        [Route("api/especialidades/get")]
        public IActionResult Get(bool active){

            if(active)
                return Json(factory.GetAll(x => x.Active));
            
            return Json(factory.GetAll());
            
        }    

        [HttpPost("api/especialidades/post")]
        public IActionResult Post([FromBody] Specialty specialty)
        {
            specialty.ToUpperCase();
            factory.InsertOrUpdateAndSave(specialty, x => x.Id == specialty.Id );
            return Json(specialty);

        }
      
        [HttpGet("api/especialidades/{id}/delete")]
        public IActionResult Delete(int id) {
            var model = factory.GetById(id);
            model.Active = false;
            factory.Save();
            return Json(new { n = id});
        }
    
    }
}
