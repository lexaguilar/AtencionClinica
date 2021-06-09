
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

        [Authorize]  
        [Route("api/about/info")]
        public IActionResult GetInfo()
        {

            App app = db.Apps.FirstOrDefault();                   

            return Json(app);
            
        }

    }
}
