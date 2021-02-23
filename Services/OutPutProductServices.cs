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
   
    public class OutPutProductServices : IProductServices<OutPutProduct>
    {
        private readonly ClinicaContext _db;
        public OutPutProductServices(ClinicaContext db)
        {
            _db = db;

        }
        public ModelValidationSource<OutPutProduct> Create(OutPutProduct outPutProduct)
        {
            
            outPutProduct.Init(_db);   

            var model = outPutProduct.Validate(_db);
            
            if (!model.IsValid)
                return model;

            _db.OutPutProducts.Add(outPutProduct);

            foreach (var item in outPutProduct.OutPutProductDetails)
            {
                var product = _db.Products.FirstOrDefault(x => x.Id == item.ProductId);
                
                var stock = _db.AreaProductStocks.FirstOrDefault(x => x.AreaId == outPutProduct.AreaId && x.ProductId == item.ProductId);                                      
                  
                stock.Stock -=  item.Quantity;
                item.Stocks = stock.Stock;
                
            }         

            return model;
        }

        public ModelValidationSource<OutPutProduct> CreateFrom(Traslate traslate)
        {
            var items = new List<OutPutProductDetail>();
            foreach (var item in traslate.TraslateDetails)
            {
                items.Add(new OutPutProductDetail{
                    ProductId = item.ProductId,
                    Quantity = item.QuantityResponse,
                    Cost = item.Cost,
                    Price = item.Price,
                    Discount = item.Discount
                });
            } 

            var outPutProduct = new OutPutProduct{
                AreaId = traslate.AreaSourceId,
                TypeId = (int)InputType.Traslado,
                Date = DateTime.Today,               
                Observation = "Salida por traslado",
                CreateBy = traslate.CreateBy,
                Reference = traslate.Id.ToString(),                
                OutPutProductDetails = items
            };

            return this.Create(outPutProduct);
            
        }

        public ModelValidationSource<OutPutProduct> CreateFrom(WorkOrder work)
        {

            var follow = _db.Follows.FirstOrDefault(x => x.Id == work.FollowId);

            var items = new List<OutPutProductDetail>();
            foreach (var item in work.WorkOrderDetails.Where(x => !x.IsService))
            {

                var areaProducto = _db.AreaProductStocks.FirstOrDefault(x => x.AreaId == follow.AreaSourceId && x.ProductId == item.ProductId);

                items.Add(new OutPutProductDetail{
                    ProductId = item.ProductId.Value,
                    Quantity = item.Quantity,
                    Cost = areaProducto.CostAvg,
                    Price = item.Price,
                    Discount = 0
                });

            } 

            var outPutProduct = new OutPutProduct{
                AreaId = follow.AreaSourceId,
                TypeId = (int)InputType.Traslado,
                Date = DateTime.Today,               
                Observation = "Despacho por servicios",
                CreateBy = work.CreateBy,
                Reference = work.Reference,                
                OutPutProductDetails = items
            };

            return this.Create(outPutProduct);
            
        }

        public int Delete(int id)
        {
            throw new NotImplementedException();
        }

        public OutPutProduct GetById(int id)
        {
            throw new NotImplementedException();
        }

        public ModelValidationSource<OutPutProduct> Revert(OutPutProduct model)
        {
            throw new NotImplementedException();
        }

        public ModelValidationSource<OutPutProduct> Update(OutPutProduct model)
        {
            throw new NotImplementedException();
        }
    }

    
}