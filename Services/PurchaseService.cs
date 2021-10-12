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
        (bool IsSuccess, string Error) Create(Purchase purchase);
        (bool IsSuccess, string Error) Delete(int id);
        (bool IsSuccess, string Error) Process(string userName, int id);
        (bool IsSuccess, string Error) Update(Purchase purchase);
    }

    public class PurchaseService : IPurchaseService
    {
        private readonly ClinicaContext _db;
        public PurchaseService(ClinicaContext db)
        {
            _db = db;
        }
        public (bool IsSuccess, string Error) Create(Purchase purchase)
        {

            Init(purchase);

            var model = Validate(purchase);

            if (!model.IsSuccess)
                return model;

            _db.Purchases.Add(purchase);

            _db.SaveChanges();

            return (true, null);
        }

        public (bool IsSuccess, string Error) Update(Purchase source)
        {
            var model = Validate(source);

            if (!model.IsSuccess)
                return model;

            var purchase = _db.Purchases.Include(x => x.PurchaseDetails).FirstOrDefault(x => x.Id == source.Id);

            purchase.CopyAllFromExcept(source, x => new
            {
                x.Id,
                x.CreateAt,
                x.Area,
                x.Currency,
                x.Provider,
                x.PurchaseType,
                x.Status,
                x.PurchaseDetails
            });

            //Actualizar entradas
            foreach (var detail in purchase.PurchaseDetails)
            {
                var sourceDetail = source.PurchaseDetails.FirstOrDefault(x => x.Id == detail.Id);
                //Si no existe, marcar para eliminacion
                if (sourceDetail == null)
                {
                    _db.PurchaseDetails.Remove(detail);
                    continue;
                }
                detail.CopyAllFromExcept(sourceDetail, x => new
                {
                    x.Id,
                    x.Product,
                    x.Purchase
                });
            }

            //Agregar entradas nuevas
            source.PurchaseDetails.Where(x => x.Id == 0).ToList().ForEach(x => purchase.PurchaseDetails.Add(x));

            _db.SaveChanges();

            return (true, null);
        }

        public (bool IsSuccess, string Error) Process(string userName, int id)
        {
            var purchase = _db.Purchases.Include(x => x.PurchaseDetails).FirstOrDefault(x => x.Id == id);
            if (purchase == null)
                return (false, "El registro no ha sido encontrado.");

            if (purchase.StatusId != (int)PurchaseStatuses.Pendiente)
                return (false, "El estado del registro actual no permite ser procesado para su traslado a invertario.");

            var now = UserHelpers.GetTimeInfo();

            InPutProduct inPutProduct = new InPutProduct
            {
                AreaId = purchase.AreaId,
                TypeId = (int)InputType.Compras,
                Date = now,
                SubTotal = purchase.SubTotal,
                Discount = purchase.Discount,
                Import = purchase.Import,
                Iva = purchase.Iva,
                Total = purchase.Total,
                Rate = purchase.Rate,
                Observation = purchase.Observation,
                CurrencyId = purchase.CurrencyId,
                StateId = 1,
                CreateAt = now,
                CreateBy = userName,
                Reference = purchase.Reference,
                ProviderId = purchase.ProviderId
            };

            foreach (var item in purchase.PurchaseDetails)
            {
                inPutProduct.InPutProductDetails.Add(new InPutProductDetail
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity + item.Royalty,
                    Cost = item.Cost,
                    Price = item.Price,
                    SubTotal = item.SubTotal,
                    Discount = item.Discount,
                    Import = item.Import,
                    Iva = item.Iva,
                    Total = item.Total,
                    CostAvg = item.CostAvg,
                    Stocks = item.Stocks
                });

                ComputeAreStock(item);
            }
            purchase.StatusId=(int)PurchaseStatuses.Procesado;
            _db.InPutProducts.Add(inPutProduct);
            _db.SaveChanges();

            return (true, null);
        }


        public (bool IsSuccess, string Error) Delete(int id)
        {
            var reg = _db.Purchases.FirstOrDefault(x => x.Id == id);
            if (reg == null)
                return new(false, "No se encontro el registro indicado.");

            if (reg.StatusId != (int)PurchaseStatuses.Pendiente)
                return (false, "El estado actual no permite anular este registro.");

            reg.StatusId = (int)PurchaseStatuses.Anulado;
            _db.SaveChanges();

            return (true, null);
        }

        public InPutProduct GetById(int id)
        {
            throw new NotImplementedException();
        }


        private void Init(Purchase p)
        {
            var app = _db.Apps.SingleOrDefault();

            p.CurrencyId = app.DefaultCurrency;

            p.StatusId = 1;
            p.CreateAt = UserHelpers.GetTimeInfo();

            var rate = _db.Rates.FirstOrDefault(x => x.Date == p.Date);
            if (rate != null)
                p.Rate = rate.Value;

            foreach (var item in p.PurchaseDetails)
            {

                item.SubTotal = Math.Round(Convert.ToDecimal(item.Quantity ) * item.Cost, 6);
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

        private (bool IsSuccess, string Msg) Validate(Purchase p)
        {

            var modelValidation = new ModelValidationSource<Purchase>(p);
            modelValidation.model = p;

            if (p.Rate == 0)
                return (false, $"No se encontr� la tasa de cambio para la fecha {p.Date}");

            var area = _db.Areas.FirstOrDefault(x => x.Id == p.AreaId);

            if (area == null)
                return (false, $"No se encontr� el area");

            if (!area.Active)
                return (false, $"El area {area.Name} no esta activa");

            var app = _db.Apps.FirstOrDefault();

            if (area.Id != app.AreaMainId)
                return (false, $"El area {area.Name} no esta habilitada para ingreso de compras");

            var totalItems = p.PurchaseDetails.Select(x => x.ProductId).Distinct().Count();
            if (totalItems != p.PurchaseDetails.Select(x => x.ProductId).Count())
                return (false, $"No se permite items duplicados");

            var lastPurchase = _db.Purchases.Where(x => x.AreaId == p.AreaId).OrderByDescending(x => x.Id).FirstOrDefault();
            if (lastPurchase != null)
                if (lastPurchase.Date > p.Date)
                    return (false, $"No se puede crear una entrada de inventario con fecha menor a {lastPurchase.Date}");

            foreach (var item in p.PurchaseDetails)
            {
                var product = _db.Products.FirstOrDefault(x => x.Id == item.ProductId);
                if (product.StateId != 1)
                    return (false, $"El producto {product.Name} no esta activo");

                if (item.Quantity <= 0)
                    return (false, $"La cantidad del item {product.Name} no debe ser menor o igual a 0");

                if (item.Cost <= 0)
                    return (false, $"El costo del producto {product.Name} no debe ser menor o igual a 0");

                if (item.Price <= 0)
                    return (false, $"El precio del producto {product.Name} no debe ser menor o igual a 0");

                if (app.ValidatePriceGreaterCost && item.Price <= item.Cost)
                    return (false, $"El precio del producto {product.Name} es menor al costo");


            }

            return (true, null);
        }


        private void ComputeAreStock(PurchaseDetail item)
        {
            var stock = _db.AreaProductStocks.FirstOrDefault(x => x.AreaId == item.Purchase.AreaId && x.ProductId == item.ProductId);

            if (stock == null)
            {
                var areaProductStock = new AreaProductStock
                {
                    AreaId = item.Purchase.AreaId,
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


    }

    public static class PurchaseServiceCollectionExtensions
    {
        public static IServiceCollection AddPurchaseService(this IServiceCollection services)
        {
            return services.AddTransient<IPurchaseService, PurchaseService>();
        }
    }

}