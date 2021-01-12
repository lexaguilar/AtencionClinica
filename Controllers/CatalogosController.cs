using System;
using Microsoft.AspNetCore.Mvc;
using AtencionClinica.Factory;
using AtencionClinica.Models;

namespace AtencionClinica.Controllers
{  
    [Route("api/catalogos")]
    public class CatalogosController : Controller
    {      
        private readonly ClinicaContext db;
        public CatalogosController(ClinicaContext _db){
            db = _db;
        }

        [Route("{name}")]
        public IActionResult GenericsCatalogs(string name){

            var catalogoFactory = new CatalogoFactory(db);
            return Json(catalogoFactory.GetAll(name));            

        }
    }
}
