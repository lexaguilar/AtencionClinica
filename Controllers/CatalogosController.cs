using System;
using Microsoft.AspNetCore.Mvc;
using AtencionClinica.Factory;
using AtencionClinica.Models;
using System.Linq;

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

        
        [Route("get-catalog-gerenals")]
        public IActionResult GenericGetCatalogs(){

            var beneficiaryStatus = db.BeneficiaryStatuses.ToArray();
            var city = db.Cities.ToArray();
            var customerStatus = db.CustomerStatuses.ToArray();
            var customerType = db.CustomerTypes.ToArray();
            var region = db.Regions.ToArray();
            var relationship = db.Relationships.ToArray();
            var sex = db.Sexs.ToArray();
            var inPutProductState = db.InPutProductStates.ToArray();
            var outPutProductState = db.OutPutProductStates.ToArray();
            var InPutProductType = db.InPutProductTypes.ToArray();
            var outPutProductType = db.OutPutProductTypes.ToArray();
            var productState = db.ProductStates.ToArray();
            var area = db.Areas.ToArray();

            return Json(new {
                beneficiaryStatus,
                city,
                customerStatus,
                customerType,
                region,
                relationship,
                sex,
                inPutProductState,
                InPutProductType,
                outPutProductState,
                outPutProductType,
                productState,
                area
            });

        }
    }
}
