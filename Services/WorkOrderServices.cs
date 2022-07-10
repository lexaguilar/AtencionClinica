using AtencionClinica.Extensions;
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
    public class WorkOrderServices : IProductServices<WorkOrder>
    {
        private readonly ClinicaContext _db;
        public WorkOrderServices(ClinicaContext db)
        {
            _db = db;

        }

        public ModelValidationSource<WorkOrder> Create(WorkOrder workOrder)
        {
            workOrder.Init(_db);

            var model = workOrder.Validate(_db);
            
            if (!model.IsValid)
                return model;   

            var follow = _db.Follows.FirstOrDefault(x => x.Id == workOrder.FollowId); 

            foreach (var item in workOrder.WorkOrderDetails.Where(x => !x.IsService))
            {

                var areaProducto = _db.AreaProductStocks.FirstOrDefault(x => x.AreaId == follow.AreaTargetId && x.ProductId == item.ProductId);

                item.Costo = areaProducto.CostAvg;

            }       

            _db.WorkOrders.Add(workOrder);

            //Crear salida          
            if(workOrder.WorkOrderDetails.Any(x => !x.IsService)){
                var outPutProductServices = new OutPutProductServices(_db);
                var modelOnPutProducts =  outPutProductServices.CreateFrom(workOrder, null);
                if (!modelOnPutProducts.IsValid)
                    return new ModelValidationSource<WorkOrder>(workOrder).AsError(modelOnPutProducts.Error);
            }

            return model;
        }

        
        public ModelValidationSource<WorkOrder> CreateFromAdmin(Admission admission)
        {
            var follow = admission.Follows.FirstOrDefault();
            var workOrder = follow.WorkOrders.FirstOrDefault();  
            
            workOrder.Init(_db);

            var model = workOrder.Validate(_db, validateAll: false, admission);
            
            if (!model.IsValid)
                return model;

            _db.Admissions.Add(admission);

            //Crear salida          
            var outPutProductServices = new OutPutProductServices(_db);
            var modelOnPutProducts =  outPutProductServices.CreateFrom(workOrder, admission.AreaId);
            if (!modelOnPutProducts.IsValid)
                return new ModelValidationSource<WorkOrder>(workOrder).AsError(modelOnPutProducts.Error);

            return model;
        }

        //SendTest sendTest
        public void CreateTest(SendTest sendTest, Follow follow)
        {

            var serviceTest = new ServiceTest
            {
                SendTest = sendTest,
                Date = UserHelpers.GetTimeInfo(),
                CreateAt = UserHelpers.GetTimeInfo(),
                CreateBy = sendTest.CreateBy,
                DoctorId = sendTest.DoctorId,
            };

            foreach (var item in sendTest.SendTestDetails)
            {
                var service = _db.Services.FirstOrDefault(x => x.Id == item.Serviceid);

                if (service.IsCultive)//Cultivo
                {

                    serviceTest.ServiceTestCultives.Add(new ServiceTestCultive
                    {
                        ServiceTest = serviceTest,
                        ServiceId = item.Serviceid,
                        Name = service.Name
                    });

                }
                else if (item.Serviceid == 8)//BAAR
                {
                    for (int i = 1; i <= 3; i++)
                    {
                        serviceTest.ServiceTestBaarDetails.Add(new ServiceTestBaarDetail
                        {
                            ServiceTest = serviceTest,
                            ServiceId = item.Serviceid,
                            TestNumber = i
                        });
                    }
                }
                else
                {
                    var serviceDetails = _db.ServiceDetails.Where(x => x.ServiceId == item.Serviceid);

                    foreach (var item2 in serviceDetails)
                    {
                        serviceTest.ServiceTestDetails.Add(new ServiceTestDetail
                        {
                            ServiceTest = serviceTest,
                            ServiceId = item.Serviceid,
                            ServiceDetailId = item2.Id,

                            Name = item2.Name,
                            Um = item2.Um,
                            Reference = item2.Reference,

                            Result = "",
                            ResultJson = "",
                        });
                    }
                }

            }

            follow.ServiceTests.Add(serviceTest);

        }

        public ModelValidationSource<WorkOrder> Delete(int id)
        {

            throw new NotImplementedException();
           
        }

        public ModelValidationSource<WorkOrder> Delete(int id, AppUser user)
        {
            var workOrder = _db.WorkOrders.Include(x => x.WorkOrderDetails).FirstOrDefault(x => x.Id == id);

            if(!workOrder.Active)
                return new ModelValidationSource<WorkOrder>(workOrder).AsError("No se puede eliminar una orden de trabajo que ya ha sido eliminada");

            workOrder.Active = false;
            //Crear entrada            
            var inPutProductServices = new InPutProductServices(_db);
            var modelInPutProducts = inPutProductServices.CreateFrom(workOrder, user);
            if (!modelInPutProducts.IsValid)
                return new ModelValidationSource<WorkOrder>(workOrder).AsError(modelInPutProducts.Error);

            return new ModelValidationSource<WorkOrder>(workOrder).AsOk();
        }

        public WorkOrder GetById(int id)
        {
            throw new NotImplementedException();
        }

        public ModelValidationSource<WorkOrder> Revert(WorkOrder model)
        {
            throw new NotImplementedException();
        }

        public ModelValidationSource<WorkOrder> Update(WorkOrder model)
        {
            throw new NotImplementedException();
        }
    }
}