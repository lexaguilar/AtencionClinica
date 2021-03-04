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
    public class ContracsController : Controller
    {      
        private GenericFactory<Contract> factory = null;
        public ContracsController(ClinicaContext db)
        {
            this.factory = new GenericFactory<Contract>(db);
        }

        [Route("api/contracts/get")]
        public IActionResult Get(bool active){

            if(active)
                return Json(factory.GetAll(x => x.Active));
            
            return Json(factory.GetAll());
            
        } 

        [HttpPost("api/contracts/post")]
        public IActionResult Post([FromBody] Contract contract)
        {
            contract.ToUpperCase();
            factory.InsertOrUpdateAndSave(contract, x => x.Id == contract.Id );
            return Json(contract);

        }
      
        [HttpGet("api/contracts/{id}/delete")]
        public IActionResult Delete(int id) {
            var model = factory.GetById(id);
            model.Active = false;
            factory.Save();
            return Json(new { n = id});
        }
    
    }
}
