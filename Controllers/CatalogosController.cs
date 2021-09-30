using System;
using Microsoft.AspNetCore.Mvc;
using AtencionClinica.Factory;
using AtencionClinica.Models;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

namespace AtencionClinica.Controllers
{
    [Authorize]  
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

        [Route("productsAsCatalog")]
        public IActionResult Get(int skip, int take, IDictionary<string, string> values) 
        {
             IQueryable<Product> products = db.Products;

            if (values.ContainsKey("name"))
            {
                var name = Convert.ToString(values["name"]);
                products = products.Where(x => x.Name.Contains(name));
            }

            var items = products.Skip(skip).Take(take);

            return Json(new
            {
                items,
                totalCount = products.Count()
            });

        }    


        [Route("products/{id}")]
        public IActionResult Get(int id) 
        {
            var product = db.Products.FirstOrDefault(x => x.Id == id);
           
            return Json(product);

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
            var purchaseStatuses=db.PurchaseStatuses.ToArray();
            var purchaseTypes=db.PurchaseTypes.ToArray();
            var area = db.Areas.ToArray();
            var currency = db.Currencies.ToArray();
            var billType = db.BillTypes.ToArray();
            var privateCustomerStat = db.PrivateCustomerStats.ToArray();
            var traslateState = db.TraslateStates.ToArray();
            var traslateStage = db.TraslateStages.ToArray();
            var admissionType = db.AdmissionTypes.ToArray();
            var privateCustomerType = db.PrivateCustomerTypes.ToArray();
            var contract = db.Contracts.ToArray();

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
                purchaseStatuses,
                purchaseTypes,
                area,
                currency,
                billType,
                privateCustomerStat,
                traslateState,
                traslateStage,
                admissionType,
                privateCustomerType,
                contract
            });

        }
    }
}
