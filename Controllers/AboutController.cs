
using System.Linq;
using AtencionClinica.Factory;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AtencionClinica.Controllers
{
    public class AboutController : Controller
    {
        private GenericFactory<App> factory = null;
        private readonly ClinicaContext db = null;
        public AboutController(ClinicaContext _db)
        {
            this.factory = new GenericFactory<App>(_db);
            this.db = _db;
        }

        [Route("api/about/get-info")]
        public IActionResult Get()
        {

            App app = db.Apps.FirstOrDefault();

            if (app == null)
                return BadRequest("Los valores iniciales de la aplicacion no estan establecidos");

            app.Version = Program.version.ToString() + "*";            

            return Json(app);
        }

        [HttpPost("api/about/set-info")]
        public IActionResult SetInfo([FromBody] App app)
        {
            App oldApp = db.Apps.FirstOrDefault();

            if (oldApp == null)
                return BadRequest("Los valores iniciales de la aplicacion no estan establecidos");            
                
            oldApp.CopyFrom(app, x=> 
                new {  
                    x.ValidatePriceGreaterCost, 
                    x.MinAgeToAdmission, 
                    x.AreaDoctorId 
                });

            db.SaveChanges();

            return Json(app);
        }

        [Authorize]  
        [Route("api/about/info")]
        public IActionResult GetInfo()
        {

            App app = db.Apps.FirstOrDefault();                   

            return Json(app);
            
        }

    }
}
