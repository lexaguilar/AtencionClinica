using System;
using System.Linq;

namespace AtencionClinica.Models
{
    public partial class HemoLog : ModelExtension<HemoLog>
    {
        public void Init()
        {
            this.CreateAt = DateTime.Now;
        }


        public ModelValidationSource<HemoLog> Validate(ClinicaContext _db)
        {

            var modelValidation = new ModelValidationSource<HemoLog>(this);
            modelValidation.model = this;

            var group = _db.Groups.FirstOrDefault(x => x.Id == this.GroupId);

            if (group == null)
                return modelValidation.AsError($"No se encontró el grupo");

            if (!group.Active)
                return modelValidation.AsError($"El grupo {group.Name} no esta activa");

            var area = _db.Areas.FirstOrDefault(x => x.Id == group.AreaId);

            if (area == null)
                return modelValidation.AsError($"No se encontró el area");

            if (!area.Active)
                return modelValidation.AsError($"El area {area.Name} no esta activa");

            foreach (var item in this.HemoLogDetails)
            {
                var privateCustomer = _db.PrivateCustomers.FirstOrDefault(x => x.Id == item.PrivateCustomerId);

                if (privateCustomer == null)
                    return modelValidation.AsError($"El paciente con id {item.PrivateCustomerId} no existe");

                if (privateCustomer.PrivateCustomerStatusId != 1)
                    return modelValidation.AsError($"El paciente con id {item.PrivateCustomerId} no esta activo");

                var areaProducto = _db.AreaProductStocks.FirstOrDefault(x => x.AreaId == group.AreaId && x.ProductId == item.ProductId);
                if (areaProducto == null)
                    return modelValidation.AsError($"El producto con id {item.ProductId} no existe o esta activo en el area");

                item.Cost = areaProducto.CostAvg;

            }
            return modelValidation.AsOk();
        }
    }

}