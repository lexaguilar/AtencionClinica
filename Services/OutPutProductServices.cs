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
                    Discount = item.Discount,
                    CostAvg = item.Cost,
                });
            } 

            var outPutProduct = new OutPutProduct{
                AreaId = traslate.AreaSourceId,
                TypeId = (int)InputType.Traslado,
                Date = traslate.Date,               
                Observation = "Salida por traslado",
                CreateBy = traslate.CreateBy,
                Reference = traslate.Id.ToString(),                
                OutPutProductDetails = items
            };

            return this.Create(outPutProduct);
            
        }

        public ModelValidationSource<OutPutProduct> CreateFrom(WorkOrder work, int? areaTargetId)
        {
            int areaId = 0;

            if(areaTargetId == null){

                var follow = _db.Follows.FirstOrDefault(x => x.Id == work.FollowId);
                areaId = follow.AreaTargetId;
            }else
                areaId = areaTargetId.Value;

            var items = new List<OutPutProductDetail>();
            foreach (var item in work.WorkOrderDetails.Where(x => !x.IsService))
            {

                var areaProducto = _db.AreaProductStocks.FirstOrDefault(x => x.AreaId == areaId && x.ProductId == item.ProductId);

                items.Add(new OutPutProductDetail{
                    ProductId = item.ProductId.Value,
                    Quantity = item.Quantity,
                    Cost = areaProducto.CostAvg,
                    CostAvg = areaProducto.CostAvg,
                    Price = item.Price,
                    Discount = 0
                });

            } 

            var outPutProduct = new OutPutProduct{
                AreaId = areaId,
                TypeId = (int)OutputType.FarmaciaServicios,
                Date = work.Date,
                Observation = "Despacho por servicios",
                CreateBy = work.CreateBy,
                Reference = work.Reference,
                OutPutProductDetails = items
            };

            return this.Create(outPutProduct);
            
        }

        public ModelValidationSource<OutPutProduct> CreateFrom(PrivateWorkOrder work)
        {

            var follow = _db.FollowsPrivates.FirstOrDefault(x => x.Id == work.FollowsPrivateId);

            var items = new List<OutPutProductDetail>();
            foreach (var item in work.PrivateWorkOrderDetails.Where(x => !x.IsService))
            {

                var areaProducto = _db.AreaProductStocks.FirstOrDefault(x => x.AreaId == follow.AreaTargetId && x.ProductId == item.ProductId);

                items.Add(new OutPutProductDetail{
                    ProductId = item.ProductId.Value,
                    Quantity = item.Quantity,
                    Cost = areaProducto.CostAvg,
                    CostAvg = areaProducto.CostAvg,
                    Price = item.Price,
                    Discount = 0
                });

            } 

            var outPutProduct = new OutPutProduct{
                AreaId = follow.AreaTargetId,
                TypeId = (int)OutputType.FarmaciaServicios,
                Date = work.Date,
                Observation = "Despacho por servicios privados",
                CreateBy = work.CreateBy,
                Reference = work.Reference,
                OutPutProductDetails = items
            };

            return this.Create(outPutProduct);
            
        }

        public ModelValidationSource<OutPutProduct> CreateFrom(Bill bill)
        {
            var items = new List<OutPutProductDetail>();
            foreach (var item in bill.BillDetails.Where(x => !x.IsService))
            {
                var areaProducto = _db.AreaProductStocks.FirstOrDefault(x => x.AreaId == bill.AreaId && x.ProductId == item.ProductId);

                items.Add(new OutPutProductDetail{
                    ProductId = item.ProductId.Value,
                    Quantity = Convert.ToDouble(item.Quantity),
                    Cost = areaProducto.CostAvg,
                    Price = item.Price,
                    Discount = 0,
                    CostAvg = areaProducto.CostAvg
                });
            } 

            var outPutProduct = new OutPutProduct{
                AreaId = bill.AreaId,
                TypeId = (int)OutputType.Facturacion,
                Date = bill.CreateAt,               
                Observation = "Salida por factura",
                CreateBy = bill.CreateBy,               
                OutPutProductDetails = items,
            };

            return this.Create(outPutProduct);
            
        }

        public ModelValidationSource<OutPutProduct> CreateFrom(HemoLog hemoLog)
        {
             var group = _db.Groups.FirstOrDefault(x => x.Id == hemoLog.GroupId);  

            var items = new List<OutPutProductDetail>();

            var productsId = hemoLog.HemoLogDetails.Select(x => x.ProductId).Distinct();

            foreach (var productId in productsId)
            {
                var areaProducto = _db.AreaProductStocks.FirstOrDefault(x => x.AreaId == group.AreaId && x.ProductId == productId);

                var quantity = hemoLog.HemoLogDetails.Where(x => x.ProductId == productId).Sum(x => x.Quantity);

                if(quantity > 0)
                    items.Add(new OutPutProductDetail{
                        ProductId = productId,
                        Quantity = Convert.ToDouble(quantity),
                        Cost = areaProducto.CostAvg,
                        Price = areaProducto.Price,
                        Discount = 0,
                        CostAvg = areaProducto.CostAvg
                    });
            } 

            var outPutProduct = new OutPutProduct{
                AreaId = group.AreaId,
                TypeId = (int)OutputType.Hemodialisis,
                Date = hemoLog.CreateAt,               
                Observation = "Salida por hemodialisis",
                CreateBy = hemoLog.CreateBy,               
                OutPutProductDetails = items,
            };

            return this.Create(outPutProduct);
            
        }


        public ModelValidationSource<OutPutProduct> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public ModelValidationSource<OutPutProduct> Delete(int id, AppUser user)
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