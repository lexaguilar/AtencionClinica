using System;
using System.Linq;

namespace AtencionClinica.Models{
    public partial class WorkOrder : ModelExtension<WorkOrder>  {

        public void Init(ClinicaContext _db){

            this.CreateAt = UserHelpers.GetTimeInfo();
            this.Active = true;

        }

        public void Update(ClinicaContext _db){
           
        }
        

        public ModelValidationSource<WorkOrder> Validate(ClinicaContext _db, bool validateAll = true, Admission admision = null){

            var modelValidation = new ModelValidationSource<WorkOrder>(this);
            modelValidation.model = this;

            Area area = null;

            App app = _db.Apps.FirstOrDefault();
            
            var hours = 8;
            if(app != null)
                hours = app.AdmissionHoursDifferent;

            if(validateAll){

                var admissionId = 0;
                if(this.Follow != null)
                    admissionId = this.Follow.AdmissionId;   

                Follow follow = null;      
                if(this.Follow != null)
                    follow = this.Follow;
                else 
                    follow = _db.Follows.FirstOrDefault(x => x.Id == this.FollowId);
                    
                admision = _db.Admissions.FirstOrDefault(x => x.Id == follow.AdmissionId);

                if(!admision.Active)
                    return modelValidation.AsError($"La admisión no esta activa");

                var existeMasReciente = _db.Admissions.Any(x => x.Id > follow.AdmissionId && x.BeneficiaryId == admision.BeneficiaryId && x.Active);
                if(existeMasReciente)
                    return modelValidation.AsError($"Existe una admisión mas reciente de paciente, ésta ya no es válida");

                //if(follow.AreaTargetId == (int)AreaRestrict.Farmacia){

                if(admision.TypeId == (int)AdmisionTypes.Consulta)
                    if(admision.CreateAt.Date != DateTime.Today)
                        if(Math.Abs((admision.CreateAt - UserHelpers.GetTimeInfo()).TotalHours) > hours)
                            return modelValidation.AsError($"No se puede despachar sin una admisión previa de hoy");
            
                if(string.IsNullOrEmpty(this.Reference))
                    return modelValidation.AsError($"La referencia de la orden es necesaria");

                if(admision.TypeId == (int)AdmisionTypes.IngresoHops && admision.Finished)
                    return modelValidation.AsError($"La admision del paciente ya no es válida");

                area = _db.Areas.FirstOrDefault(x => x.Id == follow.AreaTargetId);                
                    
            //}


            }else{
                area = _db.Areas.FirstOrDefault(x => x.Id == admision.AreaId);
            }

            
            var doctor = _db.Doctors.FirstOrDefault(x => x.Id == this.DoctorId);
            if(!doctor.Active)
                return modelValidation.AsError($"El doctor {doctor.Name} no esta activo");

            var bene = _db.Beneficiaries.FirstOrDefault(x => x.Id == admision.BeneficiaryId);
            if(bene.BeneficiaryStatusId != 1)
                return modelValidation.AsError($"El beneficiario no esta activo");

            var customers = _db.Customers.FirstOrDefault(x => x.Inss == bene.Inss);
            if(customers.CustomerStatusId != 1)
                return modelValidation.AsError($"El beneficiario no esta activo en percapita");           


            if(area == null)
                return modelValidation.AsError($"No se encontró el area");

            if(!area.Active)
                return modelValidation.AsError($"El area {area.Name} no esta activa");            

            foreach (var item in this.WorkOrderDetails)            
                item.IsService = item.ServiceId.HasValue;
            

            var totalItems = this.WorkOrderDetails.Where(x => !x.IsService).Select(x => x.ProductId).Distinct().Count();
            if(totalItems != this.WorkOrderDetails.Where(x => !x.IsService).Select(x => x.ProductId).Count())            
                return modelValidation.AsError($"No se permite items duplicados");

            totalItems = this.WorkOrderDetails.Where(x => x.IsService).Select(x => x.ServiceId).Distinct().Count();
            if(totalItems != this.WorkOrderDetails.Where(x => x.IsService).Select(x => x.ServiceId).Count())            
                return modelValidation.AsError($"No se permite procedimientos duplicados");

            foreach (var item in this.WorkOrderDetails)
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
    
        
        public ModelValidationSource<WorkOrder> ValidateUpdate(ClinicaContext _db){

           throw new NotImplementedException();

        }
    
    }
}