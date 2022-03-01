using System;
using System.Linq;

namespace AtencionClinica.Models
{
    public partial class Bill : ModelExtension<Bill>
    {
        public void Init(ClinicaContext _db)
        {

            var app = _db.Apps.FirstOrDefault();

            this.Active = true;
            this.CreateAt = UserHelpers.GetTimeInfo();

            var rate = _db.Rates.FirstOrDefault(x => x.Date == this.CreateAt);
            if (rate != null)
                this.Rate = rate.Value;

            foreach (var item in this.BillDetails)
            {

                item.SubTotal = Math.Round((Convert.ToDecimal(item.Quantity) * item.Price), 6);

                item.Total = item.SubTotal;
                item.IsService = item.ProductId == null;

            }
            this.Total = this.BillDetails.Sum(x => x.Total);

        }


        public ModelValidationSource<Bill> Validate(ClinicaContext _db)
        {

            var modelValidation = new ModelValidationSource<Bill>(this);
            modelValidation.model = this;

            if (this.Rate == 0)
                return modelValidation.AsError($"No se encontró la tasa de cambio para la fecha {this.CreateAt}");

            var area = _db.Areas.FirstOrDefault(x => x.Id == this.AreaId);

            if (area == null)
                return modelValidation.AsError($"No se encontró el area");

            if (!area.Active)
                return modelValidation.AsError($"El area {area.Name} no esta activa");

            var app = _db.Apps.FirstOrDefault();

            var totalProducts = this.BillDetails.Select(x => x.ProductId).Where(x => x.HasValue).Distinct().Count();
            var totalServices = this.BillDetails.Select(x => x.ServiceId).Where(x => x.HasValue).Distinct().Count();

            if (totalProducts == 0 && totalServices == 0)
                return modelValidation.AsError($"Debe agregar al menos un producto o procedimiento");

            if ((totalProducts + totalServices) != this.BillDetails.Select(x => x.Id).Count())
                return modelValidation.AsError($"No se permite items duplicados");

            var lastInPutProduct = _db.InPutProducts.Where(x => x.AreaId == this.AreaId).OrderByDescending(x => x.Id).FirstOrDefault();
            if (lastInPutProduct != null)
                if (lastInPutProduct.Date > this.CreateAt)
                    return modelValidation.AsError($"No se puede crear una entrada de inventario con fecha menor a {lastInPutProduct.Date}");

            foreach (var item in this.BillDetails)
            {
                if (item.IsService)
                {

                    var service = _db.Services.FirstOrDefault(x => x.Id == item.ServiceId);
                    if (!service.Active)
                        return modelValidation.AsError($"El servicio {service.Name} no esta activo");

                    if (item.Quantity <= 0)
                        return modelValidation.AsError($"La cantidad del item {service.Name} no debe ser menor o igual a 0");

                    if (item.Price <= 0)
                        return modelValidation.AsError($"El precio del producto {service.Name} no debe ser menor o igual a 0");


                }
                else
                {

                    var product = _db.Products.FirstOrDefault(x => x.Id == item.ProductId);
                    if (product.StateId != 1)
                        return modelValidation.AsError($"El producto {product.Name} no esta activo");

                    if (item.Quantity <= 0)
                        return modelValidation.AsError($"La cantidad del item {product.Name} no debe ser menor o igual a 0");

                    if (item.Price <= 0)
                        return modelValidation.AsError($"El precio del producto {product.Name} no debe ser menor o igual a 0");


                }

            }

            return modelValidation.AsOk();
        }
    }

}