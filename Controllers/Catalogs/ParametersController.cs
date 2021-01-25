using System;
using System.Collections.Generic;
using System.Linq;
using AtencionClinica.Factory;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace AtencionClinica.Controllers
{  
    public class ParametersController : Controller
    {      
        private GenericFactory<Parameter> factory = null;
        public ParametersController(ClinicaContext db)
        {
            this.factory = new GenericFactory<Parameter>(db);
        }

        [Route("api/parameters/get")]
        public IActionResult Get() => Json(factory.GetAll());      

       
    
    }
}
