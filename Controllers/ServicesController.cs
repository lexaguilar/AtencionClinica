using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AtencionClinica.Extensions;
using AtencionClinica.Factory;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace AtencionClinica.Controllers
{
    [Authorize]
    public class ServicesController : Controller
    {
        private ClinicaContext _db = null;
        private ServicesFactory factory = null;
        public ServicesController(ClinicaContext db)
        {
            this._db = db;
            factory = new ServicesFactory(this._db);
        }

        [Route("api/services/get")]
        public IActionResult Get(int skip, int take, IDictionary<string, string> values)
        {
            IQueryable<Service> services = _db.Services
           .OrderByDescending(x => x.Id);

            if (values.ContainsKey("id"))
            {
                var id = Convert.ToInt32(values["id"]);
                services = services.Where(x => x.Id == id);
            }

            if (values.ContainsKey("name"))
            {
                var name = Convert.ToString(values["name"]);
                services = services.Where(x => x.Name.StartsWith(name));
            }

            if (values.ContainsKey("typeId"))
            {
                var typeId = Convert.ToInt32(values["typeId"]);
                services = services.Where(x => x.TypeId == typeId);
            }

            if (values.ContainsKey("currencyId"))
            {
                var currencyId = Convert.ToInt32(values["currencyId"]);
                services = services.Where(x => x.CurrencyId == currencyId);
            }

            var totalCount = services.Count();

            if (values.ContainsKey("requireTotalCount"))
            {
               var requireTotalCount = Convert.ToBoolean(values["requireTotalCount"]);
                if (requireTotalCount){
                        services = services.Skip(skip).Take(take);                
                }
            }

            return Json(new
            {
                items = services,
                totalCount
            });

        }

        [Route("api/services/area/{areaId}/get")]
        public IActionResult Get(int areaId,bool active)
        {
           var result = factory.GetByArea(areaId, active);

           return Json(result);

        }

        [HttpPost("api/services/post")]
        public IActionResult Post([FromBody] Service service)
        {
            
            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            if (service.Id > 0)
            {
                var oldService = _db.Services.FirstOrDefault(x => x.Id == service.Id);

                if(oldService.CurrencyId != service.CurrencyId){

                    //Verificar que no tenga movimientos en facturas
                    var hasBills = _db.BillDetails.Any(x => x.ServiceId == service.Id);
                    if(hasBills)
                        return BadRequest("No se puede editar la moneda de este servicio porque ya tiene facturas");

                    //Verificar que no tenga movimientos en facturas
                    var hasWorkOrders = _db.WorkOrderDetails.Any(x => x.ServiceId == service.Id);
                    if(hasWorkOrders)
                        return BadRequest("No se puede editar la moneda de este servicio porque ya tiene ordenes de trabajo");

                }

                oldService.CopyFrom(service, x => new
                {
                    x.Name,
                    x.Price,
                    x.PriceCalculate,
                    x.Active,
                    x.CurrencyId,
                    x.IsCultive,
                    x.TypeId
                });

                _db.SaveChanges();
            }
            else
            {
                var existe = _db.Services.Any(x => x.Name == service.Name);

                if (existe)
                    return BadRequest($"Ya existe un servicio con el nombre {service.Name}");

                service.Active = true;
                _db.Services.Add(service);
                _db.SaveChanges();
            }

            return Json(service);

        }

        //TODO no podes eliminar un servicio si ya tiene movimientos
        [HttpGet("api/services/{id}/delete")]
        public IActionResult Delete(int id)
        {
            var service = _db.Services.FirstOrDefault(x => x.Id == id);

            if (service != null)
            {
                service.Active = false;
                _db.SaveChanges();
            }

            return Json(new { n = id });
        }

        [Route("api/services/{serviceId}/products/get")]
        public IActionResult Get(int serviceId)
        {

            IQueryable<ServiceProduct> serviceProducts = _db.ServiceProducts
           .Where(x => x.ServiceId == serviceId);

            return Json(serviceProducts);

        }

        [HttpPost("api/services/{serviceId}/products/post")]
        public IActionResult Post([FromBody] ServiceProduct serviceProduct)
        {

            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            if (serviceProduct.Id > 0)
            {
                var oldService = _db.ServiceProducts.FirstOrDefault(x => x.Id == serviceProduct.Id);

                oldService.CopyFrom(serviceProduct, x => new
                {
                    x.ServiceId,
                    x.ProductId,
                    x.Quantity,                    
                });

                _db.SaveChanges();
            }
            else
            {
                var existe = _db.ServiceProducts.Any(x => x.ServiceId == serviceProduct.ServiceId && x.ProductId == serviceProduct.ProductId);
                if (!existe)
                {
                    _db.ServiceProducts.Add(serviceProduct);
                    _db.SaveChanges();
                }else{
                    return BadRequest($"El producto {serviceProduct.ProductId} ya esta agregado a la lista");
                }
            }

            return Json(serviceProduct);

        }

        [HttpGet("api/services/{serviceId}/products/{id}/delete")]
        public IActionResult DeleteService(int id)
        {
            var serviceProduct = _db.ServiceProducts.FirstOrDefault(x => x.Id == id);

            if (serviceProduct != null)
            {
                _db.ServiceProducts.Remove(serviceProduct);
                _db.SaveChanges();
            }

            return Json(new { n = id });
        }

    }
}
