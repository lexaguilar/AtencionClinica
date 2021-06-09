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
    public class TiposController : Controller
    {      
        private GenericFactory<ServiceType> factory = null;
        public TiposController(ClinicaContext db)
        {
            this.factory = new GenericFactory<ServiceType>(db);
        }

        [Route("api/tipos/get")]
        public IActionResult Get(bool active){
            
            return Json(factory.GetAll());
            
        } 

        [HttpPost("api/tipos/post")]
        public IActionResult Post([FromBody] ServiceType model)
        {

            model.Name = model.Name.Trim().ToUpper();
            factory.InsertOrUpdateAndSave(model, x => x.Id == model.Id );
            return Json(model);

        }
      
        [HttpGet("api/tipos/{id}/delete")]
        public IActionResult Delete(int id) {
            
            throw new NotImplementedException();

        }
    
    }
}
