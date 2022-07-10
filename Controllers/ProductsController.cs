using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AtencionClinica.Extensions;
using AtencionClinica.Factory;
using AtencionClinica.Models;
using AtencionClinica.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

namespace AtencionClinica.Controllers
{
    [Authorize]
    public class ProductsController : Controller
    {
        private ClinicaContext _db = null;
        private ProductsFactory factory = null;
        private IProductServices<OutPutProduct> _serviceOutPut;
        private IProductServices<InPutProduct> _serviceInPut;
        public ProductsController(ClinicaContext db, IProductServices<OutPutProduct> serviceOutPut, IProductServices<InPutProduct> serviceInPut)
        {
            this._db = db;
            factory = new ProductsFactory(this._db);
            _serviceOutPut = serviceOutPut;
            _serviceInPut = serviceInPut;
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
        public IActionResult GetCatalog(int areaId, bool active, bool exists, bool has, int skip, int take, IDictionary<string, string> values)
        {
            var result = factory.GetByArea(areaId, active, exists, has);

            return Json(result);

        }

        [Route("api/products/get")]
        public IActionResult Get(int skip, int take, IDictionary<string, string> values)
        {
            IQueryable<Product> products = _db.Products
           .OrderBy(x => x.Name);

            if (values.ContainsKey("id"))
            {
                var id = Convert.ToInt32(values["id"]);
                products = products.Where(x => x.Id == id);
            }

            if (values.ContainsKey("name"))
            {
                var name = Convert.ToString(values["name"]);
                products = products.Where(x => x.Name.StartsWith(name));
            }

            if (values.ContainsKey("familyId"))
            {
                var familyId = Convert.ToInt32(values["familyId"]);
                products = products.Where(x => x.FamilyId == familyId);
            }

            if (values.ContainsKey("presentationId"))
            {
                var presentationId = Convert.ToInt32(values["presentationId"]);
                products = products.Where(x => x.PresentationId == presentationId);
            }

            if (values.ContainsKey("stateId"))
            {
                var stateId = Convert.ToInt32(values["stateId"]);
                products = products.Where(x => x.StateId == stateId);
            }

            var totalCount = products.Count();

            if (values.ContainsKey("requireTotalCount"))
            {
               var requireTotalCount = Convert.ToBoolean(values["requireTotalCount"]);
                if (requireTotalCount){
                    products = products.Skip(skip).Take(take);                
                }
            }

            return Json(new
            {
                items = products,
                totalCount
            });

        }

        [HttpPost("api/products/post")]
        public IActionResult Post([FromBody] Product product)
        {

            var user = this.GetAppUser(_db);
            if (user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            if (product.Id > 0)
            {
                var oldProduct = _db.Products
                .Include(x => x.InPutProductDetails)
                .ThenInclude(x => x.InPutProduct)
                .FirstOrDefault(x => x.Id == product.Id);

                if (oldProduct.CurrencyId != product.CurrencyId)
                    if (oldProduct.InPutProductDetails.Any())
                    {
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
                oldProduct.LastDateModificationAt = UserHelpers.GetTimeInfo();

                _db.SaveChanges();
            }
            else
            {
                var existe = _db.Products.Any(x => x.Name == product.Name);

                if (existe)
                    return BadRequest($"Ya existe un producto con el nombre {product.Name}");

                product.CreateBy = user.Username;
                product.LastModificationBy = user.Username;

                product.CreateAt = UserHelpers.GetTimeInfo();
                product.LastDateModificationAt = UserHelpers.GetTimeInfo();

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

        [HttpGet("api/products/{productId}/convert/{quantity}")]
        public IActionResult Delete(int productId, int quantity)
        {
            var user = this.GetAppUser(_db);

            var product = _db.Products.FirstOrDefault(x => x.Id == productId);

            if (product == null)
                return BadRequest($"No se encontro el producto con Id {productId}");

            if (product.StateId != 1)
                return BadRequest($"El producto con Id {productId} no esta activo");

            if (product.ConvertProductId == null)
                return BadRequest($"No se ha especificado un producto de conversion para el producto con Id {productId} ");

            if (product.ConvertProductQuantity == null)
                return BadRequest($"No se ha especificado la cantidad de conversion para el producto con Id {productId}");

            if (product.ConvertProductQuantity <= 0)
                return BadRequest($"La cantidad de conversion para el producto con Id {productId} debe ser mayor a 0");

            var itemsOutPut = new List<OutPutProductDetail>();

            var areaProductoOutPut = _db.AreaProductStocks.FirstOrDefault(x => x.AreaId == user.AreaId && x.ProductId == productId);

            //Salidas
            itemsOutPut.Add(new OutPutProductDetail
            {
                ProductId = productId,
                Quantity = quantity,
                Cost = areaProductoOutPut.CostAvg,
                CostAvg = areaProductoOutPut.CostAvg,
                Price = areaProductoOutPut.Price,
                Discount = 0
            });

            var outPutProduct = new OutPutProduct
            {
                AreaId = user.AreaId,
                TypeId = (int)OutputType.Conversion,
                Date = DateTime.Today,
                Observation = "Salida por conversion de unidades",
                CreateBy = user.Username,
                Reference = "",
                OutPutProductDetails = itemsOutPut
            };

            var resultOutPut = _serviceOutPut.Create(outPutProduct);

            if (!resultOutPut.IsValid)
                return BadRequest(resultOutPut.Error);


            //Entradas
            var productIdInPut = (product.ConvertProductId ?? 0);
            var quantityInPut = product.ConvertProductQuantity ?? 0;
            var areaProductoInPut = _db.AreaProductStocks.FirstOrDefault(x => x.AreaId == user.AreaId && x.ProductId == productIdInPut);


            var cost = 0M;
            var price = 0M;
            if (areaProductoInPut != null)
            {

                cost = areaProductoInPut.CostAvg;
                price = areaProductoInPut.Price;

            }
            else
            {

                cost = areaProductoOutPut.CostAvg / Convert.ToDecimal(quantityInPut);
                price = areaProductoOutPut.Price / Convert.ToDecimal(quantityInPut);

            }

            var itemsInPut = new List<InPutProductDetail>();

            itemsInPut.Add(new InPutProductDetail
            {
                ProductId = productIdInPut,
                Quantity = quantityInPut * quantity,
                Cost = cost,
                Price = price,
                Discount = 0
            });

            var inPutProduct = new InPutProduct
            {
                AreaId = user.AreaId,
                TypeId = (int)InputType.Conversion,
                Date = DateTime.Today,
                Observation = "Entrada por conversion de unidades",
                CreateBy = user.Username,
                Reference = "",
                InPutProductDetails = itemsInPut
            };


            var resultInPut = _serviceInPut.Create(inPutProduct);

            if (!resultInPut.IsValid)
                return BadRequest(resultInPut.Error);

            _db.SaveChanges();

            return Json(new { n = productId });
        }



        [HttpPost("api/products/post/file")]
        public IActionResult PostFile(int year, int month, IFormFile file)
        {

            var user = this.GetAppUser(_db);

            var families = _db.Families.ToArray();
            var ums = _db.UnitOfMeasures.ToArray();
            var presentations = _db.Presentations.ToArray();
            var currencies = _db.Currencies.ToArray();


            if (file.Length > 0)
            {
                ISheet sheet;
                using (var stream = file.OpenReadStream())
                {
                    var sFileExtension = file.FileName.Split(".").Last();

                    if (string.IsNullOrEmpty(sFileExtension))
                        return NotFound("No se encontro la extension del archivo");

                    stream.Position = 0;
                    if (sFileExtension == "xls")
                    {
                        HSSFWorkbook hssfwb = new HSSFWorkbook(stream); //This will read the Excel 97-2000 formats  
                        sheet = hssfwb.GetSheetAt(0); //get first sheet from workbook  
                    }
                    else
                    {
                        XSSFWorkbook hssfwb = new XSSFWorkbook(stream); //This will read 2007 Excel format  
                        sheet = hssfwb.GetSheetAt(0); //get first sheet from workbook   
                    }

                    IRow headerRow = sheet.GetRow(0); //Get Header Row
                    int cellCount = headerRow.LastCellNum;
                    for (int i = (sheet.FirstRowNum + 1); i <= sheet.LastRowNum; i++) //Read Excel File
                    {
                        IRow row = sheet.GetRow(i);
                        if (row == null) continue;

                        if (row.Cells.All(d => d.CellType == CellType.Blank)) continue;

                        try
                        {
                            string name = row.GetCell(0).ToString();
                            string description = row.GetCell(1).StringCellValue;

                            string familyName = row.GetCell(2).StringCellValue;
                            string laboratoryName = row.GetCell(3).StringCellValue;
                            string umName = row.GetCell(4).StringCellValue;
                            string currencyName = row.GetCell(5).StringCellValue;

                            double stock = row.GetCell(6).NumericCellValue;

                            var product = _db.Products.FirstOrDefault(x => x.Name == name.Trim());
                            if (product != null)
                                return BadRequest($"El producto {product.Name} ya existe");

                            var familyId = families.FirstOrDefault(x => x.Name == familyName.Trim())?.Id;
                            if (familyId == null)
                                return BadRequest($"No se encontro la familia con nombre {familyName}");

                            var umId = ums.FirstOrDefault(x => x.Name == umName.Trim())?.Id;
                            if (umId == null)
                                return BadRequest($"No se encontro la unidad de medida con nombre {umName}");

                            var presentationId = presentations.FirstOrDefault(x => x.Name == laboratoryName.Trim())?.Id;
                            if (presentationId == null)
                                return BadRequest($"No se encontro el laboratorio con nombre {laboratoryName}");

                            var currencyId = currencies.FirstOrDefault(x => x.Name == currencyName.Trim())?.Id;
                            if (currencyId == null)
                                return BadRequest($"No se encontro la moneda con nombre {currencyName}");


                            _db.Products.Add(new Product
                            {
                                Name = name,
                                Description = description,

                                FamilyId = familyId.Value,
                                PresentationId = presentationId.Value,
                                UnitOfMeasureId = umId.Value,
                                CurrencyId = currencyId.Value,

                                StockMin = stock,

                                CreateBy = user.Username,
                                CreateAt = UserHelpers.GetTimeInfo(),
                                HasIva = false,
                                StateId = 1,
                                LastModificationBy = user.Username,
                                LastDateModificationAt = UserHelpers.GetTimeInfo(),                              

                            });

                        }
                        catch (FormatException ex)
                        {
                            return BadRequest($"Un error ocurrio " + ex.Message);
                        }
                    }

                    _db.SaveChanges();

                }
            }

            return Json(new
            {
                name = file.FileName,
                size = file.Length
            });
        }


    }
}
