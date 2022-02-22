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
   
    public class InPutProductServices : IProductServices<InPutProduct>
    {
        private readonly ClinicaContext _db;
        public InPutProductServices(ClinicaContext db)
        {
            _db = db;

        }
        public ModelValidationSource<InPutProduct> Create(InPutProduct inPutProduct)
        {
            
            inPutProduct.Init(_db);   

            var model = inPutProduct.Validate(_db);
            
            if (!model.IsValid)
                return model;

            _db.InPutProducts.Add(inPutProduct);

            foreach (var item in inPutProduct.InPutProductDetails)
            {                
                var stock = _db.AreaProductStocks.FirstOrDefault(x => x.AreaId == inPutProduct.AreaId && x.ProductId == item.ProductId);

                if(stock == null)
                {
                    var areaProductStock = new AreaProductStock{
                        AreaId = inPutProduct.AreaId,
                        ProductId = item.ProductId,
                        Stock = item.Quantity,
                        CostAvg = item.Cost,
                        CostReal = item.Cost,
                        Min = 0,
                        Price = item.Price,
                        StockMin = 0,
                        Inherit=true
                    };

                    item.CostAvg = item.Cost;
                    item.Stocks = item.Quantity;

                    _db.AreaProductStocks.Add(areaProductStock);
                }else{
                    var costoPromedioAnt = stock.CostAvg;
                    var existencias = stock.Stock;

                    stock.Price = item.Price;
                    stock.Stock +=  item.Quantity;
                    stock.CostReal = item.Cost;
                    stock.CostAvg = ((costoPromedioAnt * Convert.ToDecimal(existencias)) + (Convert.ToDecimal(item.Quantity) * item.Cost)) / (Convert.ToDecimal(item.Quantity) + Convert.ToDecimal(existencias));

                    item.CostAvg = stock.CostAvg;
                    item.Stocks = stock.Stock;

                }
            }         

            //_db.SaveChanges();

            return model;
        }

        public ModelValidationSource<InPutProduct> CreateFrom(Traslate traslate)
        {
            var items = new List<InPutProductDetail>();
            foreach (var item in traslate.TraslateDetails)
            {
                items.Add(new InPutProductDetail{
                    ProductId = item.ProductId,
                    Quantity = item.QuantityResponse,
                    Cost = item.Cost,
                    Price = item.Price,
                    Discount = item.Discount
                });
            } 

            var inPutProduct = new InPutProduct{
                AreaId = traslate.AreaTargetId,
                TypeId = (int)InputType.Traslado,
                Date = traslate.Date,               
                Observation = "Entrada por traslado",
                CreateBy = traslate.CreateBy,
                Reference = traslate.Id.ToString(),                
                InPutProductDetails = items
            };

            return this.Create(inPutProduct);

        }

        public ModelValidationSource<InPutProduct> CreateFrom(WorkOrder workOrder, AppUser user)
        {

            var follow = _db.Follows.FirstOrDefault(x => x.Id == workOrder.FollowId);

            var items = new List<InPutProductDetail>();
            foreach (var item in workOrder.WorkOrderDetails.Where(x => !x.IsService))
            {

                var stock = _db.AreaProductStocks.FirstOrDefault(x => x.AreaId == follow.AreaTargetId 
                && x.ProductId == item.ProductId);


                items.Add(new InPutProductDetail{
                    ProductId = item.ProductId??0,
                    Quantity = item.Quantity,
                    Cost = stock.CostAvg,
                    Price = item.Price,
                    Discount = 0
                });
            } 

            var inPutProduct = new InPutProduct{
                AreaId = follow.AreaTargetId,
                TypeId = (int)InputType.AjusteEntrada,
                Date = DateTime.Now,               
                Observation = "Ajuste por anulacion",
                CreateBy = user.Username,
                Reference = workOrder.Id.ToString(),                
                InPutProductDetails = items
            };

            return this.Create(inPutProduct);

        }

        public ModelValidationSource<InPutProduct> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public ModelValidationSource<InPutProduct> Delete(int id, AppUser user)
        {
            throw new NotImplementedException();
        }

        public InPutProduct GetById(int id)
        {
            throw new NotImplementedException();
        }

        public ModelValidationSource<InPutProduct> Revert(InPutProduct inPutProduct)
        {
           

            var model = inPutProduct.ValidateRevert(_db);

            inPutProduct.Revert();  

            foreach (var item in inPutProduct.InPutProductDetails)
            { 

                var stock = _db.AreaProductStocks.FirstOrDefault(x => x.AreaId == inPutProduct.AreaId && x.ProductId == item.ProductId); 

                var lastInput = _db.InPutProductDetails
                .Include(x => x.InPutProduct).OrderByDescending(x => x.InPutProductId)
                .FirstOrDefault(x => x.ProductId == item.ProductId && x.InPutProduct.StateId == 1 && x.InPutProductId < inPutProduct.Id);

                if(lastInput == null){

                    _db.AreaProductStocks.Remove(stock);

                } else{
                    stock.Stock = lastInput.Stocks;
                    stock.CostAvg =  lastInput.CostAvg;
                    stock.CostReal =  lastInput.Cost;
                    stock.Price =  lastInput.Price;
                }
                
            } 

            if (!model.IsValid)
                return model;            

            return model;


        }

        public ModelValidationSource<InPutProduct> Update(InPutProduct model)
        {
            throw new NotImplementedException();
        }
    }

    
}