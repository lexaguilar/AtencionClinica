using System;
using System.Linq;

namespace AtencionClinica.Models{
    public partial class OutPutProduct : ModelExtension<OutPutProduct>  {
        public void Init(ClinicaContext _db){

            var app = _db.Apps.FirstOrDefault();

            this.CurrencyId = app.DefaultCurrency;
            
            this.StateId = 1;
            this.CreateAt = DateTime.Now;

            var rate = _db.Rates.FirstOrDefault(x => x.Date == this.Date);
            if(rate != null)
                this.Rate = rate.Value;      

            foreach (var item in this.OutPutProductDetails)
            {
                
                item.SubTotal = Math.Round((Convert.ToDecimal(item.Quantity) * item.Cost), 6);
                item.Discount = 0;
                item.Import = item.SubTotal - item.Discount;
                item.Total =  item.Import + item.Iva;

            }

            this.SubTotal = this.OutPutProductDetails.Sum(x => x.SubTotal);
            this.Discount = this.OutPutProductDetails.Sum(x => x.Discount);
            this.Import = this.OutPutProductDetails.Sum(x => x.Import);
            this.Iva = this.OutPutProductDetails.Sum(x => x.Iva);
            this.Total = this.OutPutProductDetails.Sum(x => x.Total);

           
        }

        public ModelValidationSource<OutPutProduct> Validate(ClinicaContext _db){

            var modelValidation = new ModelValidationSource<OutPutProduct>(this);
            modelValidation.model = this;

            if(this.Rate == 0)
                return modelValidation.AsError($"No se encontró la tasa de cambio para la fecha {this.Date}");    

            var area = _db.Areas.FirstOrDefault(x => x.Id == this.AreaId);

            if(area == null)
                return modelValidation.AsError($"No se encontró el area");

            if(!area.Active)
                return modelValidation.AsError($"El area {area.Name} no esta activa");

            var app = _db.Apps.FirstOrDefault();

            var totalItems = this.OutPutProductDetails.Select(x => x.ProductId).Distinct().Count();
            if(totalItems != this.OutPutProductDetails.Select(x => x.ProductId).Count())            
                return modelValidation.AsError($"No se permite items duplicados");

            if(this.OutPutProductDetails.Count == 0)
                return modelValidation.AsError($"Debe agregar al menos un producto");

            foreach (var item in this.OutPutProductDetails)
            {
                var product = _db.Products.FirstOrDefault(x => x.Id == item.ProductId);
                if(product.StateId != 1)
                    return modelValidation.AsError($"El producto {product.Name} no esta activo");

                if(item.Quantity <= 0)
                    return modelValidation.AsError($"La cantidad del item {product.Name} no debe ser menor o igual a 0");

                if(item.Cost <= 0)
                    return modelValidation.AsError($"El costo del producto {product.Name} no debe ser menor o igual a 0");

                if(item.Price <= 0)
                    return modelValidation.AsError($"El precio del producto {product.Name} no debe ser menor o igual a 0");                

                if(app.ValidatePriceGreaterCost && item.Price <= item.Cost)
                    return modelValidation.AsError($"El precio del producto {product.Name} es menor al costo");
                
                var stockResult = _db.AreaProductStocks.FirstOrDefault(x => x.AreaId == this.AreaId && x.ProductId == item.ProductId);
                if(stockResult == null)
                    return modelValidation.AsError($"No se puede dar salida al item {product.Name} porque no existe en el area {area.Name}");

                var stock = stockResult.Stock - item.Quantity;
                if(stock < 0)
                    return modelValidation.AsError($"No se puede dar salida al item {product.Name} porque quedaria en negativo");

            }

            return modelValidation.AsOk();
        }
    }

    public partial class OutPutProductDetail : ModelExtension<OutPutProductDetail>  {}
}