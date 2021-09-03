using System;
using System.Linq;

namespace AtencionClinica.Models{
    public partial class PrivateWorkOrder : ModelExtension<PrivateWorkOrder>  {

        public void Init(ClinicaContext _db){

            this.CreateAt = UserHelpers.GetTimeInfo();
            this.Active = true;

        }

        public void Update(ClinicaContext _db){
           
        }

        public ModelValidationSource<PrivateWorkOrder> Validate(ClinicaContext _db){

            var modelValidation = new ModelValidationSource<PrivateWorkOrder>(this);
            modelValidation.model = this;

            var follow = _db.FollowsPrivates.FirstOrDefault(x => x.Id == this.FollowsPrivateId);
            var bill = _db.Bills.FirstOrDefault(x => x.Id == follow.BillId);

            if(!bill.Active)
                return modelValidation.AsError($"La factura no esta activa");

            var existeMasReciente = _db.Bills.Any(x => x.Id > follow.BillId && x.PrivateCustomerId == bill.PrivateCustomerId && x.Active);
            if(existeMasReciente)
                return modelValidation.AsError($"Existe una factura mas reciente de paciente, ésta ya no es válida");

            //if(follow.AreaTargetId == (int)AreaRestrict.Farmacia){

                if(bill.BillTypeId == (int)BillTypes.Expontanea)
                    if(bill.CreateAt.Date != DateTime.Today)
                        return modelValidation.AsError($"No se puede despachar sin una factura previa de hoy");
            
                // if(string.IsNullOrEmpty(this.Reference))
                //     return modelValidation.AsError($"La referencia de la orden es necesaria");

                if(bill.BillTypeId == (int)BillTypes.FacturaIngreso && bill.Finished)                
                    return modelValidation.AsError($"La factura del paciente ya no es válida");
                
                    
            //}

            var doctor = _db.Doctors.FirstOrDefault(x => x.Id == this.DoctorId);
            if(!doctor.Active)
                return modelValidation.AsError($"El doctor {doctor.Name} no esta activo");

            var customer = _db.PrivateCustomers.FirstOrDefault(x => x.Id == bill.PrivateCustomerId);
            if(customer.PrivateCustomerStatusId != 1)
                return modelValidation.AsError($"El cliente no esta activo");


            var area = _db.Areas.FirstOrDefault(x => x.Id == follow.AreaTargetId);

            if(area == null)
                return modelValidation.AsError($"No se encontró el area");

            if(!area.Active)
                return modelValidation.AsError($"El area {area.Name} no esta activa");            

            foreach (var item in this.PrivateWorkOrderDetails)            
                item.IsService = item.ServiceId.HasValue;            

            var totalItems = this.PrivateWorkOrderDetails.Where(x => !x.IsService).Select(x => x.ProductId).Distinct().Count();
            if(totalItems != this.PrivateWorkOrderDetails.Where(x => !x.IsService).Select(x => x.ProductId).Count())            
                return modelValidation.AsError($"No se permite items duplicados");

            totalItems = this.PrivateWorkOrderDetails.Where(x => x.IsService).Select(x => x.ServiceId).Distinct().Count();
            if(totalItems != this.PrivateWorkOrderDetails.Where(x => x.IsService).Select(x => x.ServiceId).Count())            
                return modelValidation.AsError($"No se permite procedimientos duplicados");

            foreach (var item in this.PrivateWorkOrderDetails)
            {
                if(!item.IsService){

                    var product = _db.Products.FirstOrDefault(x => x.Id == item.ProductId);

                    if(product.StateId != 1)
                        return modelValidation.AsError($"El producto {product.Name} no esta activo");   

                    if(item.Quantity <= 0)
                        return modelValidation.AsError($"La cantidad solicitada del item {product.Name} no debe ser menor o igual a 0");

                }else{

                    var service = _db.Services.FirstOrDefault(x => x.Id == item.ServiceId);

                    if(!service.Active)
                        return modelValidation.AsError($"El servicio {service.Name} no esta activo");   

                    if(item.Quantity <= 0)
                        return modelValidation.AsError($"La cantidad solicitada del servicio {service.Name} no debe ser menor o igual a 0");
                    
                }
                
            }

            return modelValidation.AsOk();
        }
    
        
        public ModelValidationSource<PrivateWorkOrder> ValidateUpdate(ClinicaContext _db){

           throw new NotImplementedException();

        }
    
    }

    public partial class PrivateWorkOrderDetail : ModelExtension<PrivateWorkOrderDetail>  {

    }
}