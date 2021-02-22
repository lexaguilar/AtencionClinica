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
    public class TraslateServices : IProductServices<Traslate>
    {
        private readonly ClinicaContext _db;
        public TraslateServices(ClinicaContext db)
        {
            _db = db;

        }
        public ModelValidationSource<Traslate> Create(Traslate traslate)
        {
            
            traslate.Init(_db);

            var model = traslate.Validate(_db);
            
            if (!model.IsValid)
                return model;

            _db.Traslates.Add(traslate);

            // _db.SaveChanges();

            return model;
        }

        public ModelValidationSource<Traslate> Revert(Traslate model)
        {
            throw new NotImplementedException();
        }

        public ModelValidationSource<Traslate> Update(Traslate traslate)
        {
            traslate.Update(_db);

            var model = traslate.ValidateUpdate(_db);

            if (!model.IsValid)
                return model;

            var oldTraslate = _db.Traslates.Include(x => x.TraslateDetails).FirstOrDefault(x => x.Id == traslate.Id);

            oldTraslate.CopyFrom(traslate, x => new {
                x.StageId,
                x.LastDateModificationAt,
                x.LastModificationBy
            });
           
            foreach (var item in oldTraslate.TraslateDetails)
            {
                var currentSend = traslate.TraslateDetails.FirstOrDefault(x => x.ProductId == item.ProductId);
                item.QuantityResponse = currentSend.QuantityResponse;
            }

            //Crear entrada            
            var inPutProductServices = new InPutProductServices(_db);
            var modelInPutProducts =  inPutProductServices.CreateFrom(traslate);
            if (!modelInPutProducts.IsValid)
                return new ModelValidationSource<Traslate>(traslate).AsError(modelInPutProducts.Error);

            //Crear salida          
            var outPutProductServices = new OutPutProductServices(_db);
            var modelOnPutProducts =  outPutProductServices.CreateFrom(traslate);
            if (!modelOnPutProducts.IsValid)
                return new ModelValidationSource<Traslate>(traslate).AsError(modelOnPutProducts.Error);

            return model;
        }
    }
}