using AtencionClinica.Factory;
using AtencionClinica.Models;
using AtencionClinica.ViewModel;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;


namespace AtencionClinica.Services
{
    public interface IInPutProductServices
    {
        ModelValidationSource<InPutProduct> Create(InPutProduct inPutProduct);

    }
    public class InPutProductServices : IInPutProductServices
    {
        private readonly ClinicaContext _db;
        public InPutProductServices(ClinicaContext db)
        {
            _db = db;

        }
        public ModelValidationSource<InPutProduct> Create(InPutProduct inPutProduct)
        {
            var area = _db.Areas.FirstOrDefault(x => x.Id == inPutProduct.AreaId);
            var model = inPutProduct.Validate(area);
            
            if (!model.IsValid)
                return model;

            inPutProduct.Init();




            // var oldinPutProduct = _db.InPutProducts.FirstOrDefault(x => x.Id == inPutProduct.Id);

            // oldinPutProduct.CopyFrom(inPutProduct, x => new
            // {
            //     x.Date,
            //     x.Observation,
            //     x.AreaId,
            //     x.TypeId
            // });

            // var details = _db.InPutProductDetails.Where(x => x.InPutProductId == inPutProduct.Id);
            // _db.InPutProductDetails.RemoveRange(details);

          

            _db.InPutProducts.Add(inPutProduct);

            // foreach (var item in inPutProduct.InPutProductDetails)
            // {
            //     var detail = new InPutProductDetail();
            //     detail.CopyAllFromExcept(item, x => new { x.Id });
            //     _db.InPutProductDetails.Add(detail);
            // }

            _db.SaveChanges();

            return model;
        }
    }

    static class AuthUserServiceCollectionExtensions
    {
        public static void AddInPutProductServices(this IServiceCollection services)
        {

            services.AddScoped<IInPutProductServices, InPutProductServices>();
        }
    }
}