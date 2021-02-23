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

            _db.WorkOrders.Add(workOrder);

            //Crear salida          
            var outPutProductServices = new OutPutProductServices(_db);
            var modelOnPutProducts =  outPutProductServices.CreateFrom(workOrder);
            if (!modelOnPutProducts.IsValid)
                return new ModelValidationSource<WorkOrder>(workOrder).AsError(modelOnPutProducts.Error);

            return model;
        }

        public int Delete(int id)
        {
            throw new NotImplementedException();
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