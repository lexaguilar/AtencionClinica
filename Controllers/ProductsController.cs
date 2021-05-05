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
    public class ProductsController : Controller
    {
        private ClinicaContext _db = null;
        private ProductsFactory factory = null;
        public ProductsController(ClinicaContext db)
        {
            this._db = db;
            factory = new ProductsFactory(this._db);
        }

        [Route("api/products/get/{id}")]
        public IActionResult GetById(int id)
        {
            var result = _db.Products.FirstOrDefault(x => x.Id == id);

            if (result == null)
                return NotFound("No se encontro el producto");

            return Json(result);

        }

        // [Route("api/products/get/catalog")]
        // public IActionResult GetCatalog(bool active)
        // {
        //     IQueryable<Product> result = _db.Products;

        //     if(active)
        //         result = result.Where(x => x.StateId == 1);        

        //     return Json(result);

        // }

        [Route("api/products/getbyarea/{areaId}")]
        public IActionResult GetCatalog(int areaId, bool active, bool exists, bool has,int skip, int take, IDictionary<string, string> values)
        {
            var result = factory.GetByArea(areaId, active, exists, has);

            return Json(result);         

        }

        [Route("api/products/get")]
        public IActionResult Get(int skip, int take, IDictionary<string, string> values)
        {
            IQueryable<Product> Products = _db.Products
           .OrderBy(x => x.Name);

            if (values.ContainsKey("id"))
            {
                var id = Convert.ToInt32(values["id"]);
                Products = Products.Where(x => x.Id == id);
            }

            if (values.ContainsKey("name"))
            {
                var name = Convert.ToString(values["name"]);
                Products = Products.Where(x => x.Name.StartsWith(name));
            }

            if (values.ContainsKey("familyId"))
            {
                var familyId = Convert.ToInt32(values["familyId"]);
                Products = Products.Where(x => x.FamilyId == familyId);
            }

            if (values.ContainsKey("presentationId"))
            {
                var presentationId = Convert.ToInt32(values["presentationId"]);
                Products = Products.Where(x => x.PresentationId == presentationId);
            }

            if (values.ContainsKey("stateId"))
            {
                var stateId = Convert.ToInt32(values["stateId"]);
                Products = Products.Where(x => x.StateId == stateId);
            }

            var items = Products.Skip(skip).Take(take);

            return Json(new
            {
                items,
                totalCount = Products.Count()
            });

        }

        [HttpPost("api/products/post")]
        public IActionResult Post([FromBody] Product product)
        {

            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            if (product.Id > 0)
            {
                var oldProduct = _db.Products
                .Include(x => x.InPutProductDetails)
                .ThenInclude(x => x.InPutProduct)
                .FirstOrDefault(x => x.Id == product.Id);

                if(oldProduct.CurrencyId != product.CurrencyId)
                    if(oldProduct.InPutProductDetails.Any()){
                        return BadRequest("No se puede editar la moneda de este producto porque ya tiene movimientos");
                    }

                oldProduct.CopyFrom(product, x => new
                {
                    x.Name,
                    x.Description,
                    x.FamilyId,
                    x.UnitOfMeasureId,
                    x.PresentationId,
                    x.StateId,
                    x.HasIva,
                    x.CurrencyId,
                    x.StockMin,
                    x.ConvertProductId,
                    x.ConvertProductQuantity,
                });

                oldProduct.LastModificationBy = user.Username;
                oldProduct.LastDateModificationAt = DateTime.Now;

                _db.SaveChanges();
            }
            else
            {
                var existe = _db.Products.Any(x => x.Name == product.Name);

                if (existe)
                    return BadRequest($"Ya existe un producto con el nombre {product.Name}");

                product.CreateBy = user.Username;
                product.LastModificationBy = user.Username;

                product.CreateAt = DateTime.Now;
                product.LastDateModificationAt = DateTime.Now;

                product.CurrencyId = 1;

                _db.Products.Add(product);
                _db.SaveChanges();
            }

            return Json(product);

        }

        //TODO no podes eliminar un servicio si ya tiene movimientos
        [HttpGet("api/products/{id}/delete")]
        public IActionResult Delete(int id)
        {
            var product = _db.Products.FirstOrDefault(x => x.Id == id);

            if (product != null)
            {
                product.StateId = 2;
                _db.SaveChanges();
            }

            return Json(new { n = id });
        }

    }
}
