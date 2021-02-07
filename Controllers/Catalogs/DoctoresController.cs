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
        private readonly ClinicaContext _db = null;

        public DoctoresController(ClinicaContext db)
        {
            this._db = db;
            this.factory = new GenericFactory<Doctor>(db);
        }

        [Route("api/doctores/get")]
        public IActionResult Get(bool active){

            if(active)
                return Json(factory.GetAll(x => x.Active));
            
            return Json(factory.GetAll());
            
        }    

        [HttpPost("api/doctores/post")]
        public IActionResult Post([FromBody] Doctor doctor)
        {
            doctor.ToUpperCase();
            factory.InsertOrUpdateAndSave(doctor, x => x.Id == doctor.Id );
            return Json(doctor);

        }
      
        [HttpGet("api/doctores/{id}/delete")]
        public IActionResult Delete(int id) => Json(new { n = factory.DeleteAndSave(id) });

        [HttpGet("api/doctores/specialties/{specialtyId}")]
        public IActionResult DoctorsSpecialty(int specialtyId, bool active)
        {
            var doctors = _db.Doctors.Where(x => x.SpecialtyId == specialtyId);
            if(active)
                doctors = doctors.Where(x => x.Active);
            return Json(doctors);
        }

        [HttpGet("api/doctores/{doctorId}/times")]
        public IActionResult Times(int doctorId)
        {
            var doctors = _db.DoctorTimes.FirstOrDefault(x => x.DoctorId == doctorId);

            if(doctors == null)
                return BadRequest("El medico seleccionado no tiene horario configurado de atencion");

            return Json(doctors);
        }
    
    }
}
