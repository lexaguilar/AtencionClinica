using System;
using System.Linq;

namespace AtencionClinica.Models{
    public partial class InPutProduct : ModelExtension<InPutProduct>  {
        public void Init(){
            
            this.StateId = 1;
            this.StateId = 1;
            this.CreateAt = DateTime.Now;

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

        public ModelValidationSource<InPutProduct> Validate(Area area){

            var modelValidation = new ModelValidationSource<InPutProduct>(this);
            modelValidation.model = this;

            if(area == null)
                return modelValidation.AsError($"No se encontró el area");

            if(!area.Active)
                return modelValidation.AsError($"El area {area.Name} no esta activa");

            return modelValidation.AsOk();
        }
    }

    public partial class InPutProductDetail : ModelExtension<InPutProductDetail>  {}
}