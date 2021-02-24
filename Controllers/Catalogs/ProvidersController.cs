using System;
using System.Collections.Generic;
using System.Linq;
using AtencionClinica.Extensions;
using AtencionClinica.Factory;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace AtencionClinica.Controllers
{
    [Authorize]  
    public class ProvidersController : Controller
    {      
        private GenericFactory<Provider> factory = null;
        private readonly ClinicaContext _db = null;

        public ProvidersController(ClinicaContext db)
        {
            this._db = db;
            this.factory = new GenericFactory<Provider>(db);
        }

        [Route("api/providers/get")]
        public IActionResult Get(int? active){

            if(active.HasValue)
                return Json(factory.GetAll(x => x.StateId == active.Value));
            
            return Json(factory.GetAll());
            
        }    

        [HttpPost("api/providers/post")]
        public IActionResult Post([FromBody] Provider provider)
        {
            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");
             
            provider.ToUpperCase();

            provider.CreateAt = DateTime.Now;
            provider.LastDateModificationAt = DateTime.Now;

            if(provider.Id == 0){
                provider.CreateBy = user.Username;
                provider.LastModificationBy = user.Username;
            }

            factory.InsertOrUpdateAndSave(provider, x => x.Id == provider.Id );
            return Json(provider);

        }
      
        [HttpGet("api/providers/{id}/delete")]
        public IActionResult Delete(int id) {
            var model = factory.GetById(id);
            model.StateId = 2;
            factory.Save();
            return Json(new { n = id});
        }  
    }
}
