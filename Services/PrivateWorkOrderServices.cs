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
    public class PrivateWorkOrderServices : IProductServices<PrivateWorkOrder>
    {
        private readonly ClinicaContext _db;
        public PrivateWorkOrderServices(ClinicaContext db)
        {
            _db = db;

        }

        public ModelValidationSource<PrivateWorkOrder> Create(PrivateWorkOrder workOrder)
        {
            workOrder.Init(_db);

            var model = workOrder.Validate(_db);
            
            if (!model.IsValid)
                return model;

            _db.PrivateWorkOrders.Add(workOrder);

            //Crear salida          
            if(workOrder.PrivateWorkOrderDetails.Any(x => !x.IsService)){

                var outPutProductServices = new OutPutProductServices(_db);
                var modelOnPutProducts =  outPutProductServices.CreateFrom(workOrder);
                if (!modelOnPutProducts.IsValid)
                    return new ModelValidationSource<PrivateWorkOrder>(workOrder).AsError(modelOnPutProducts.Error);

            }

            return model;
        }

        public ModelValidationSource<PrivateWorkOrder> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public ModelValidationSource<PrivateWorkOrder> Delete(int id, AppUser user)
        {
            throw new NotImplementedException();
        }

        public PrivateWorkOrder GetById(int id)
        {
            throw new NotImplementedException();
        }

        public ModelValidationSource<PrivateWorkOrder> Revert(PrivateWorkOrder model)
        {
            throw new NotImplementedException();
        }

        public ModelValidationSource<PrivateWorkOrder> Update(PrivateWorkOrder model)
        {
            throw new NotImplementedException();
        }
    }
}