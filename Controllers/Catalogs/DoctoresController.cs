using System;
using System.Collections.Generic;
using System.Linq;
using AtencionClinica.Factory;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace AtencionClinica.Controllers
{  
    public class DoctoresController : Controller
    {      
        private GenericFactory<Doctor> factory = null;
        public DoctoresController(ClinicaContext db)
        {
            this.factory = new GenericFactory<Doctor>(db);
        }

        [Route("api/doctores/get")]
        public IActionResult Get() => Json(factory.GetAll());

        [HttpPost("api/doctores/post")]
        public IActionResult Post([FromBody] Doctor doctor)
        {
            doctor.ToUpperCase();
            factory.InsertOrUpdateAndSave(doctor, x => x.Id == doctor.Id );
            return Json(doctor);

        }
      
        [HttpGet("api/doctores/{id}/delete")]
        public IActionResult Delete(int id) => Json(new { n = factory.DeleteAndSave(id) });
    
    }
}
