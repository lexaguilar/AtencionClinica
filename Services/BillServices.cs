using System;
using System.Linq;
using AtencionClinica.Extensions;
using AtencionClinica.Models;

namespace AtencionClinica.Services
{
    public class BillServices : IProductServices<Bill>
    {
        private readonly ClinicaContext _db;
        public BillServices(ClinicaContext db)
        {
            _db = db;

        }

        public ModelValidationSource<Bill> Create(Bill bill)
        {

            bill.Init(_db);

            var model = bill.Validate(_db);

            if (!model.IsValid)
                return model;

            _db.Bills.Add(bill);

            var containsProducts = bill.BillDetails.Any(x => !x.IsService);

            if (containsProducts)
            {

                var outPutProductServices = new OutPutProductServices(_db);
                var modelOnPutProducts = outPutProductServices.CreateFrom(bill);
                if (!modelOnPutProducts.IsValid)
                    return new ModelValidationSource<Bill>(bill).AsError(modelOnPutProducts.Error);

            }

            return model;

        }

        public ModelValidationSource<Bill> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public ModelValidationSource<Bill> Delete(int id, AppUser user)
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

        public ModelValidationSource<Bill> Update(Bill model)
        {
            throw new NotImplementedException();
        }


    }
}