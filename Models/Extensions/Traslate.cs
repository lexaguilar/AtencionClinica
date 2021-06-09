using System;
using System.Linq;

namespace AtencionClinica.Models
{
    public partial class Traslate : ModelExtension<Traslate>
    {
        public void Init(ClinicaContext _db)
        {



            var app = _db.Apps.FirstOrDefault();

            this.CurrencyId = app.DefaultCurrency;

            this.StateId = 1;
            this.CreateAt = DateTime.Now;

            var rate = _db.Rates.FirstOrDefault(x => x.Date == this.Date);
            if (rate != null)
                this.Rate = rate.Value;

            foreach (var item in this.TraslateDetails)
            {

                var product = _db.AreaProductStocks.FirstOrDefault(x => x.AreaId == this.AreaSourceId && x.ProductId == item.ProductId);

                item.SubTotal = Math.Round((Convert.ToDecimal(item.QuantityRequest) * item.Cost), 6);
                item.Discount = 0;
                item.QuantityResponse = 0;
                item.Import = item.SubTotal - item.Discount;
                item.Total = item.Import + item.Iva;
                item.Price = product.Price;
                item.CostAvg = item.Cost;

            }

            this.SubTotal = this.TraslateDetails.Sum(x => x.SubTotal);
            this.Discount = this.TraslateDetails.Sum(x => x.Discount);
            this.Import = this.TraslateDetails.Sum(x => x.Import);
            this.Iva = this.TraslateDetails.Sum(x => x.Iva);
            this.Total = this.TraslateDetails.Sum(x => x.Total);


        }

        public void Update(ClinicaContext _db)
        {
            this.StageId = 3;
            this.LastDateModificationAt = DateTime.Now;
        }

        public ModelValidationSource<Traslate> ValidatePrev(ClinicaContext _db)
        {

            var modelValidation = new ModelValidationSource<Traslate>(this);
            modelValidation.model = this;
            if (this.StageId == 3)
                return modelValidation.AsError($"No se puede ejecutar la accion porque el traslado esta ya esta procesado");

            return modelValidation.AsOk();
        }

        public ModelValidationSource<Traslate> Validate(ClinicaContext _db)
        {

            var modelValidation = new ModelValidationSource<Traslate>(this);
            modelValidation.model = this;

            if (this.Rate == 0)
                return modelValidation.AsError($"No se encontró la tasa de cambio para la fecha {this.Date}");

            var area = _db.Areas.FirstOrDefault(x => x.Id == this.AreaTargetId);

            if (area == null)
                return modelValidation.AsError($"No se encontró el area");

            if (!area.Active)
                return modelValidation.AsError($"El area {area.Name} no esta activa");

            if (this.AreaTargetId == this.AreaSourceId)
                return modelValidation.AsError($"El area solicitante debe ser diferente a la bodega");

            var totalItems = this.TraslateDetails.Select(x => x.ProductId).Distinct().Count();
            if (totalItems != this.TraslateDetails.Select(x => x.ProductId).Count())
                return modelValidation.AsError($"No se permite items duplicados");

            foreach (var item in this.TraslateDetails)
            {
                var product = _db.Products.FirstOrDefault(x => x.Id == item.ProductId);

                if (product.StateId != 1)
                    return modelValidation.AsError($"El producto {product.Name} no esta activo");

                if (item.QuantityRequest <= 0)
                    return modelValidation.AsError($"La cantidad solicitada del item {product.Name} no debe ser menor o igual a 0");

                if (item.Cost <= 0)
                    return modelValidation.AsError($"El costo del producto {product.Name} no debe ser menor o igual a 0");

                if (item.Price <= 0)
                    return modelValidation.AsError($"El precio del producto {product.Name} no debe ser menor o igual a 0");

                var app = _db.Apps.FirstOrDefault();

                if (app.ValidatePriceGreaterCost && item.Price <= item.Cost)
                    return modelValidation.AsError($"El precio del producto {product.Name} es menor al costo");

            }

            return modelValidation.AsOk();
        }


        public ModelValidationSource<Traslate> ValidateUpdate(ClinicaContext _db)
        {

            var modelValidation = this.Validate(_db);

            if (this.StateId == 2)
                return modelValidation.AsError($"No se puede editar el traslado porque esta anulado");

            foreach (var item in this.TraslateDetails)
            {
                var product = _db.Products.FirstOrDefault(x => x.Id == item.ProductId);

                if (item.QuantityResponse < 0)
                    return modelValidation.AsError($"La cantidad despachada del item {product.Name} no debe ser menor a 0");

            }

            return modelValidation.AsOk();
        }

    }

    public partial class TraslateDetail : ModelExtension<TraslateDetail> { }
}