
using System;
using System.Collections.Generic;
using System.Linq;
using AtencionClinica.Extensions;
using AtencionClinica.Factory;
using AtencionClinica.Models;
using AtencionClinica.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AtencionClinica.Controllers
{
    [Authorize]
    public class AppointmentsController : Controller
    {
        private readonly ClinicaContext _db = null;
        public ILogger<AppointmentsController> _logger =null;
        public AppointmentsController(ClinicaContext db, ILogger<AppointmentsController> log)
        {
            this._db = db;
            this._logger = log;
        }

        [Route("api/appointments/get")]
        public IActionResult Get(int skip, int take, IDictionary<string, string> values) 
        {
           IQueryable<Appointment> appointments = _db.Appointments
             .Include(x => x.Beneficiary).ThenInclude(x => x.Relationship)  
             .Where(x => x.Active)          
            .OrderByDescending(x => x.DateAppointment);

            if (values.ContainsKey("id"))
            {
                var id = Convert.ToInt32(values["id"]);
                appointments = appointments.Where(x => x.Id == id);
            }

            if (values.ContainsKey("inss"))
            {
                var inss = Convert.ToInt32(values["inss"]);
                appointments = appointments.Where(x => x.Inss == inss);
            }

            if (values.ContainsKey("doctorId"))
            {
                var doctorId = Convert.ToInt32(values["doctorId"]);
                appointments = appointments.Where(x => x.DoctorId == doctorId);
            }

            if (values.ContainsKey("specialtyId"))
            {
                var specialtyId = Convert.ToInt32(values["specialtyId"]);
                appointments = appointments.Where(x => x.SpecialtyId == specialtyId);
            }

             if (values.ContainsKey("identification"))
            {
                var identification = Convert.ToString(values["identification"]);
                appointments = appointments.Where(x => x.Identification.StartsWith(identification));
            }

            if (values.ContainsKey("dateAppointment"))
            {
                var dateAppointment = Convert.ToDateTime(values["dateAppointment"]);
                if (values.ContainsKey("dateAppointmentEnd")){
                    var dateAppointmentEnd = Convert.ToDateTime(values["dateAppointmentEnd"]);
                    appointments = appointments.Where(x => x.DateAppointment > dateAppointment && x.DateAppointment < dateAppointmentEnd);                
                }
                else
                    appointments = appointments.Where(x => x.DateAppointment > dateAppointment && x.DateAppointment < dateAppointment.AddDays(1));
            }

            if (values.ContainsKey("createAt"))
            {
                var createAt = Convert.ToDateTime(values["createAt"]);
                appointments = appointments.Where(x => x.CreateAt > createAt && x.CreateAt < createAt.AddDays(1));
            }

            var items = appointments.Skip(skip).Take(take).Select(x => new {
                x.Id,
                x.Inss,
                Nombre = x.Beneficiary.GetFullName(),
                x.DateAppointment,
                Tipo = $"{x.Beneficiary.Relationship.Name}",
                x.DoctorId,
                x.SpecialtyId,
                x.CreateAt,
                x.CreateBy,
                x.Active,
                x.Identification
            });

            return Json(new
            {
                items,
                totalCount = appointments.Count()
            });
        }    


        [Route("api/appointments/getTimes")]
        public IActionResult Get([FromQuery]DateTime date, [FromQuery]int doctorId, [FromQuery]int specialtyId) 
        {
           IQueryable<Appointment> appointments = _db.Appointments
            .Include(x => x.Beneficiary).ThenInclude(x => x.Relationship)       
            .OrderByDescending(x => x.CreateAt)
            .Where(x => x.DateAppointment > date && x.DateAppointment < date.AddDays(1) && x.DoctorId == doctorId && x.SpecialtyId == specialtyId && x.Active); 

            var doctorHours = _db.DoctorTimes.FirstOrDefault(x => x.DoctorId == doctorId);    

            var items = appointments.Select(x => new {
                x.Id,
                x.Inss,
                Nombre = x.Beneficiary.GetFullName(),
                Tipo = $"{x.Beneficiary.Relationship.Name}",  
                x.DateAppointment,
            }).ToArray();

            var listHours = new List<ListHours>();
            var time = new DateTime(date.Year, date.Month, date.Day).AddHours(doctorHours.StartHour.Hour).AddMinutes(doctorHours.StartHour.Minute);
            for (int i = 1; i <= doctorHours.CountBeneficiarios; i++)
            {

                var citaExistente = items.FirstOrDefault(x => x.DateAppointment == time);
                if(citaExistente == null)
                    listHours.Add(new ListHours { Id= i, Tipo = "", Nombre ="", Time = time});
                else{
                    listHours.Add(new ListHours { Id= i, Tipo = citaExistente.Tipo, Nombre = citaExistente.Nombre, Time = time, Disabled = true});
                }

                time = time.AddMinutes(doctorHours.TimeMinutesForBeneficiary);

            }


            return Json(listHours);
        }    

       [HttpPost("api/appointments/post")]
        public IActionResult Post([FromBody] Appointment appointment) 
        {

            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            var appDate = new DateTime(appointment.DateAppointment.Year,appointment.DateAppointment.Month,appointment.DateAppointment.Day);

            var existe = _db.Appointments.Any(x => x.BeneficiaryId == appointment.BeneficiaryId 
            && x.DateAppointment > appDate && x.DateAppointment < appDate.AddDays(1)
            && x.Active);
            
            if(existe)
                return BadRequest($"El beneficiario ya tiene una cita activa el dia {appointment.DateAppointment.ToString("dd/MM/yyyy")}");

            var bene = _db.Beneficiaries.FirstOrDefault(x => x.Id == appointment.BeneficiaryId);
            
            appointment.Inss = bene.Inss;
            appointment.Identification = bene.Identification;
            appointment.Active = true;

            var now = UserHelpers.GetTimeInfo();

            appointment.CreateAt = now;
            appointment.CreateBy = user.Username;
            _db.Appointments.Add(appointment);  
           
            _db.SaveChanges();

            return Json(appointment);

        }      

        [HttpGet("api/appointments/{id}/delete")]
        public IActionResult Delete(int id) {
            var appointment = _db.Appointments.FirstOrDefault(x => x.Id == id);

            if(appointment.DateAppointment < DateTime.Today)
            {
                return BadRequest("No se puede cancelar una cita que ya pasó");
            }

            if(appointment != null)
            {
                appointment.Active = false;
                _db.SaveChanges();
            }

            return Json(new { n = id });
        } 

        [Route("api/appointments/get/{beneficiaryId}/last/{top}")]
        public IActionResult Get(int beneficiaryId, int top) 
        {
            IQueryable<Appointment> appointments = _db.Appointments
            .Include(x => x.Doctor)
            .Include(x => x.Specialty)
            .Where(x => x.BeneficiaryId == beneficiaryId && x.Active)
            .OrderByDescending(x => x.DateAppointment);

            var items = appointments.Take(top).Select(x => new {
                x.Id,
                x.Inss,
                Nombre = x.Beneficiary.GetFullName(),
                x.DateAppointment,
                Tipo = $"{x.Beneficiary.Relationship.Name}",
                Doctor = x.Doctor.Name,
                Specialty = x.Specialty.Name,
                x.CreateAt,
                x.CreateBy,
                x.Active
            });

            return Json(items);

        }     
       
    }
}
