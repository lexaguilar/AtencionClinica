using System;
using System.Collections.Generic;
using System.Linq;
using AtencionClinica.Factory;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace AtencionClinica.Controllers
{  
    public class EspecialidadesController : Controller
    {      
        private GenericFactory<Specialty> factory = null;
        public EspecialidadesController(ClinicaContext db)
        {
            this.factory = new GenericFactory<Specialty>(db);
        }

        [Route("api/especialidades/get")]
        public IActionResult Get() => Json(factory.GetAll());       

        [HttpPost("api/especialidades/post")]
        public IActionResult Post([FromBody] Specialty specialty)
        {
            specialty.ToUpperCase();
            factory.InsertOrUpdateAndSave(specialty, x => x.Id == specialty.Id );
            return Json(specialty);

        }
      
        [HttpGet("api/especialidades/{id}/delete")]
        public IActionResult Delete(int id) => Json(new { n = factory.DeleteAndSave(id) });
    
    }
}
