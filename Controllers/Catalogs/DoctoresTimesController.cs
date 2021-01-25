using System;
using System.Collections.Generic;
using System.Linq;
using AtencionClinica.Factory;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace AtencionClinica.Controllers
{  
    public class DoctoresTimes : Controller
    {      
        private GenericFactory<DoctorTime> factory = null;
        private readonly ClinicaContext _db = null;

        public DoctoresTimes(ClinicaContext db)
        {
            this._db = db;
            this.factory = new GenericFactory<DoctorTime>(db);
        }

        [Route("api/doctorestimes/get")]
        public IActionResult Get() => Json(factory.GetAll());

        [HttpPost("api/doctorestimes/post")]
        public IActionResult Post([FromBody] DoctorTime doctor)
        {
            factory.InsertOrUpdateAndSave(doctor, x => x.DoctorId == doctor.DoctorId );
            return Json(doctor);
        }
      
        [HttpGet("api/doctorestimes/{id}/delete")]
        public IActionResult Delete(int id) => Json(new { n = factory.DeleteAndSave(id) });
    
    }
}
