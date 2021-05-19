using System;
using AtencionClinica.Models;

namespace AtencionClinica.Services
{
    public class HemoLogServices : IProductServices<HemoLog>
    {
        private readonly ClinicaContext _db;
        public HemoLogServices(ClinicaContext db)
        {
            _db = db;

        }
           
        public ModelValidationSource<HemoLog> Create(HemoLog hemoLog)
        { 
            hemoLog.Init();

            var model = hemoLog.Validate(_db);
            
            if (!model.IsValid)
                return model;            

            _db.HemoLogs.Add(hemoLog);

            var outPutProductServices = new OutPutProductServices(_db);
            var modelOnPutProducts =  outPutProductServices.CreateFrom(hemoLog);
            if (!modelOnPutProducts.IsValid)
                return new ModelValidationSource<HemoLog>(hemoLog).AsError(modelOnPutProducts.Error);
           
           return model;
            
        }

        public int Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Bill GetById(int id)
        {
            throw new NotImplementedException();
        }

        public ModelValidationSource<Bill> Revert(Bill model)
        {
            throw new NotImplementedException();
        }

        public ModelValidationSource<HemoLog> Revert(HemoLog model)
        {
            throw new NotImplementedException();
        }

        public ModelValidationSource<Bill> Update(Bill model)
        {
            throw new NotImplementedException();
        }

        public ModelValidationSource<HemoLog> Update(HemoLog model)
        {
            throw new NotImplementedException();
        }

        HemoLog IProductServices<HemoLog>.GetById(int id)
        {
            throw new NotImplementedException();
        }
    }
}