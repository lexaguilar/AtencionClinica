using AtencionClinica.Factory;
using AtencionClinica.Models;
using AtencionClinica.ViewModel;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;


namespace AtencionClinica.Services
{
    public interface IPurchaseService
    {
        ModelValidationSource<Purchase> Create(Purchase purchase);
        ModelValidationSource<Purchase> Update(Purchase purchase);
    }

    public class PurchaseService : IPurchaseService
    {
        private readonly ClinicaContext _db;
        public PurchaseService(ClinicaContext db)
        {
            _db = db;
        }
        public ModelValidationSource<Purchase> Create(Purchase purchase)
        {

            Init(purchase);

            var model =Validate( purchase);

            if (!model.IsValid)
                return model;

            _db.Purchases.Add(purchase);

            foreach (var item in purchase.PurchaseDetails)
            {
                var stock = _db.AreaProductStocks.FirstOrDefault(x => x.AreaId == purchase.AreaId && x.ProductId == item.ProductId);

                if (stock == null)
                {
                    var areaProductStock = new AreaProductStock
                    {
                        AreaId = purchase.AreaId,
                        ProductId = item.ProductId,
                        Stock = item.Quantity,
                        CostAvg = item.Cost,
                        CostReal = item.Cost,
                        Min = 0,
                        Price = item.Price,
                        StockMin = 0,
                        Inherit = true
                    };

                    item.CostAvg = item.Cost;
                    item.Stocks = item.Quantity;

                    _db.AreaProductStocks.Add(areaProductStock);
                }
                else
                {
                    var costoPromedioAnt = stock.CostAvg;
                    var existencias = stock.Stock;

                    stock.Price = item.Price;
                    stock.Stock += item.Quantity;
                    stock.CostReal = item.Cost;
                    stock.CostAvg = ((costoPromedioAnt * Convert.ToDecimal(existencias)) + (Convert.ToDecimal(item.Quantity) * item.Cost)) / (Convert.ToDecimal(item.Quantity) + Convert.ToDecimal(existencias));

                    item.CostAvg = stock.CostAvg;
                    item.Stocks = stock.Stock;

                }
            }

            //_db.SaveChanges();

            return model;
        }

        //public ModelValidationSource<InPutProduct> CreateFrom(Traslate traslate)
        //{
        //    var items = new List<InPutProductDetail>();
        //    foreach (var item in traslate.TraslateDetails)
        //    {
        //        items.Add(new InPutProductDetail
        //        {
        //            ProductId = item.ProductId,
        //            Quantity = item.QuantityResponse,
        //            Cost = item.Cost,
        //            Price = item.Price,
        //            Discount = item.Discount
        //        });
        //    }

        //    var inPutProduct = new InPutProduct
        //    {
        //        AreaId = traslate.AreaTargetId,
        //        TypeId = (int)InputType.Traslado,
        //        Date = traslate.Date,
        //        Observation = "Entrada por traslado",
        //        CreateBy = traslate.CreateBy,
        //        Reference = traslate.Id.ToString(),
        //        InPutProductDetails = items
        //    };

        //    return this.Create(inPutProduct);

        //}

        public int Delete(int id)
        {
            throw new NotImplementedException();
        }

        public InPutProduct GetById(int id)
        {
            throw new NotImplementedException();
        }

        public ModelValidationSource<InPutProduct> Revert(InPutProduct inPutProduct)
        {


            var model = inPutProduct.ValidateRevert(_db);

            inPutProduct.Revert();

            foreach (var item in inPutProduct.InPutProductDetails)
            {

                var stock = _db.AreaProductStocks.FirstOrDefault(x => x.AreaId == inPutProduct.AreaId && x.ProductId == item.ProductId);

                var lastInput = _db.InPutProductDetails
                .Include(x => x.InPutProduct).OrderByDescending(x => x.InPutProductId)
                .FirstOrDefault(x => x.ProductId == item.ProductId && x.InPutProduct.StateId == 1 && x.InPutProductId < inPutProduct.Id);

                if (lastInput == null)
                {

                    _db.AreaProductStocks.Remove(stock);

                }
                else
                {
                    stock.Stock = lastInput.Stocks;
                    stock.CostAvg = lastInput.CostAvg;
                    stock.CostReal = lastInput.Cost;
                    stock.Price = lastInput.Price;
                }

            }

            if (!model.IsValid)
                return model;

            return model;


        }

        public ModelValidationSource<Purchase> Update(Purchase purchase)
        {
            throw new NotImplementedException();
        }

        private void Init(Purchase p) {
            var app = _db.Apps.SingleOrDefault();

            p.CurrencyId = app.DefaultCurrency;

            p.StatusId = 1;
            p.CreateAt = UserHelpers.GetTimeInfo();

            var rate = _db.Rates.FirstOrDefault(x => x.Date == p.Date);
            if (rate != null)
                p.Rate = rate.Value;

            foreach (var item in p.PurchaseDetails)
            {

                item.SubTotal = Math.Round(Convert.ToDecimal(item.Quantity+item.Royalty) * item.Cost, 6);
                item.Discount = 0;
                item.Import = item.SubTotal - item.Discount;
                item.Total = item.Import + item.Iva;

            }

            p.SubTotal = p.PurchaseDetails.Sum(x => x.SubTotal);
            p.Discount = p.PurchaseDetails.Sum(x => x.Discount);
            p.Import = p.PurchaseDetails.Sum(x => x.Import);
            p.Iva = p.PurchaseDetails.Sum(x => x.Iva);
            p.Total = p.PurchaseDetails.Sum(x => x.Total);
        }

        public ModelValidationSource<Purchase> Validate(Purchase p)
        {

            var modelValidation = new ModelValidationSource<Purchase>(p);
            modelValidation.model = p;

            if (p.Rate == 0)
                return modelValidation.AsError($"No se encontró la tasa de cambio para la fecha {p.Date}");

            var area = _db.Areas.FirstOrDefault(x => x.Id == p.AreaId);

            if (area == null)
                return modelValidation.AsError($"No se encontró el area");

            if (!area.Active)
                return modelValidation.AsError($"El area {area.Name} no esta activa");

            var app = _db.Apps.FirstOrDefault();

            if ( area.Id != app.AreaMainId)
                return modelValidation.AsError($"El area {area.Name} no esta habilitada para ingreso de compras");

            var totalItems = p.PurchaseDetails.Select(x => x.ProductId).Distinct().Count();
            if (totalItems != p.PurchaseDetails.Select(x => x.ProductId).Count())
                return modelValidation.AsError($"No se permite items duplicados");

            var lastPurchase = _db.Purchases.Where(x => x.AreaId == p.AreaId).OrderByDescending(x => x.Id).FirstOrDefault();
            if (lastPurchase != null)
                if (lastPurchase.Date > p.Date)
                    return modelValidation.AsError($"No se puede crear una entrada de inventario con fecha menor a {lastPurchase.Date}");

            foreach (var item in p.PurchaseDetails)
            {
                var product = _db.Products.FirstOrDefault(x => x.Id == item.ProductId);
                if (product.StateId != 1)
                    return modelValidation.AsError($"El producto {product.Name} no esta activo");

                if (item.Quantity <= 0)
                    return modelValidation.AsError($"La cantidad del item {product.Name} no debe ser menor o igual a 0");

                if ( item.Cost <= 0)
                    return modelValidation.AsError($"El costo del producto {product.Name} no debe ser menor o igual a 0");

                if (item.Price <= 0)
                    return modelValidation.AsError($"El precio del producto {product.Name} no debe ser menor o igual a 0");

                if (app.ValidatePriceGreaterCost && item.Price <= item.Cost)
                    return modelValidation.AsError($"El precio del producto {product.Name} es menor al costo");
                               

            }

            return modelValidation.AsOk();
        }
    }

    public static class PurchaseServiceCollectionExtensions
    {
        public static IServiceCollection AddPurchaseService(this IServiceCollection services)
        {
            return services.AddTransient<IPurchaseService, PurchaseService>();
        }
    }

}