using System;
using System.Linq;

namespace AtencionClinica.Models{
    public partial class InPutProduct : ModelExtension<InPutProduct>  {
        public void Init(ClinicaContext _db){

            var app = _db.Apps.FirstOrDefault();

            this.CurrencyId = app.DefaultCurrency;
            
            this.StateId = 1;
            this.CreateAt = UserHelpers.GetTimeInfo();

            var rate = _db.Rates.FirstOrDefault(x => x.Date == this.Date);
            if(rate != null)
                this.Rate = rate.Value;                

            foreach (var item in this.InPutProductDetails)
            {
                
                item.SubTotal = Math.Round((Convert.ToDecimal(item.Quantity) * item.Cost), 6);
                item.Discount = 0;
                item.Import = item.SubTotal - item.Discount;
                item.Total =  item.Import + item.Iva;

            }

            this.SubTotal = this.InPutProductDetails.Sum(x => x.SubTotal);
            this.Discount = this.InPutProductDetails.Sum(x => x.Discount);
            this.Import = this.InPutProductDetails.Sum(x => x.Import);
            this.Iva = this.InPutProductDetails.Sum(x => x.Iva);
            this.Total = this.InPutProductDetails.Sum(x => x.Total);
           
        }

        public void Revert(){
            this.StateId = 2;
        }

        public ModelValidationSource<InPutProduct> ValidateRevert(ClinicaContext _db){

            var modelValidation = new ModelValidationSource<InPutProduct>(this);
            modelValidation.model = this;

            var lastInput = _db.InPutProducts.OrderByDescending(x => x.Id).FirstOrDefault(x => x.AreaId == this.AreaId && x.StateId == 1);

            if(lastInput != null)
            {
                if(this.Id > lastInput.Id)
                    return modelValidation.AsError($"No se puede anular porque ya existe una entrada posterior a esta");      
            }      

            if(this.StateId == 2)
                return modelValidation.AsError($"No se puede anular porque ya se encuetra anulada");

            return modelValidation.AsOk();    
           
        }

        public ModelValidationSource<InPutProduct> Validate(ClinicaContext _db){

            var modelValidation = new ModelValidationSource<InPutProduct>(this);
            modelValidation.model = this;
        
            if(this.Rate == 0)
                return modelValidation.AsError($"No se encontró la tasa de cambio para la fecha {this.Date}");           

            var area = _db.Areas.FirstOrDefault(x => x.Id == this.AreaId);

            if(area == null)
                return modelValidation.AsError($"No se encontró el area");

            if(!area.Active)
                return modelValidation.AsError($"El area {area.Name} no esta activa");

            var app = _db.Apps.FirstOrDefault();

            if(this.TypeId == (int)InputType.Compras && area.Id != app.AreaMainId)
                return modelValidation.AsError($"El area {area.Name} no esta habilitada para ingreso de compras");

            var totalItems = this.InPutProductDetails.Select(x => x.ProductId).Distinct().Count();
            if(totalItems != this.InPutProductDetails.Select(x => x.ProductId).Count())            
                return modelValidation.AsError($"No se permite items duplicados");

            var lastInPutProduct = _db.InPutProducts.Where(x => AreaId == this.AreaId).OrderByDescending(x => x.Id).FirstOrDefault();
            if(lastInPutProduct != null)
                if(lastInPutProduct.Date > this.Date)
                    return modelValidation.AsError($"No se puede crear una entrada de inventario con fecha menor a {lastInPutProduct.Date}");

            foreach (var item in this.InPutProductDetails)
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

                if(this.TypeId == (int)InputType.SaldoInicial){
                    if( _db.AreaProductStocks.Any(x => x.AreaId == this.AreaId && x.ProductId == item.ProductId))
                        return modelValidation.AsError($"El producto {product.Name} ya tiene un ingreso el area");
                }
                
            }

            return modelValidation.AsOk();
        }
    }

    public partial class InPutProductDetail : ModelExtension<InPutProductDetail>  {}
}