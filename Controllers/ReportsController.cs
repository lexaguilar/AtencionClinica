using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AtencionClinica.Extensions;
using AtencionClinica.Models;
using AtencionClinica.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace AtencionClinica.Controllers
{
    [Authorize]
    public class ReportsController : Controller
    {

        private ClinicaContext _db = null;
        public ReportsController(ClinicaContext db)
        {
            this._db = db;
        }

        [HttpPost("api/reports/kardex")]
        public IActionResult Kardex([FromBody] KardexRequest request)
        {

            var result = _db.VwKardices.Where(x => x.AreaId == request.AreaId && x.ProductId == request.ProductId && x.Date >= request.Date.Date).OrderBy(x => x.Date).ThenBy(x => x.CreateAt).ToList();

            var entradas = (from ip in _db.InPutProducts
                            join ipd in _db.InPutProductDetails on ip.Id equals ipd.InPutProductId
                            where ip.AreaId == request.AreaId && ipd.ProductId == request.ProductId && ip.StateId == 1
                            && ip.Date < request.Date.Date
                            select ipd).Sum(x => x.Quantity);

            var salidas = (from op in _db.OutPutProducts
                           join opd in _db.OutPutProductDetails on op.Id equals opd.OutPutProductId
                           where op.AreaId == request.AreaId && opd.ProductId == request.ProductId && op.StateId == 1
                           && op.Date < request.Date.Date
                           select opd).Sum(x => x.Quantity);

            var saldoAnterior = entradas - salidas;


            return Json(new { result, saldoAnterior });
        }

        [HttpPost("api/reports/countPhisycal")]
        public IActionResult CountPhisycal([FromBody] ReportRequest request)
        {
         
            var result = from p in _db.Products
                        join um in _db.UnitOfMeasures on p.UnitOfMeasureId equals um.Id
                        select new {
                            p.Id,
                            Product = p.Name,
                            UM = um.Name,

                            SaldoAnterior = (from ip in _db.InPutProducts
                                join ipd in _db.InPutProductDetails on ip.Id equals ipd.InPutProductId
                                where ip.AreaId == request.AreaId && ipd.ProductId == p.Id && ip.StateId == 1 && ip.Date < request.From.Date
                                select ipd).Sum(x => x.Quantity) 
                                - 
                                (from op in _db.OutPutProducts
                                join opd in _db.OutPutProductDetails on op.Id equals opd.OutPutProductId
                                where op.AreaId == request.AreaId && opd.ProductId == p.Id && op.StateId == 1 && op.Date < request.From.Date
                                select opd).Sum(x => x.Quantity),

                            Entradas = (from ip in _db.InPutProducts
                                join ipd in _db.InPutProductDetails on ip.Id equals ipd.InPutProductId
                                where ip.AreaId == request.AreaId && ipd.ProductId == p.Id && ip.StateId == 1 && ip.Date >= request.From.Date && ip.Date <= request.To.Date
                                select ipd).Sum(x => x.Quantity),

                            Salidas =  (from op in _db.OutPutProducts
                                join opd in _db.OutPutProductDetails on op.Id equals opd.OutPutProductId
                                where op.AreaId == request.AreaId && opd.ProductId == p.Id && op.StateId == 1 && op.Date >= request.From.Date && op.Date <= request.To.Date
                                select opd).Sum(x => x.Quantity)
                        };
                        

            result = result.Where(x => x.SaldoAnterior + x.Entradas - x.Salidas > 0);

            return Json(result);
        }

        [HttpPost("api/reports/countPhisycalValue")]
        public IActionResult CountPhisycalValue([FromBody] ReportRequest request)
        {
         
            var result = from p in _db.Products
                        join um in _db.UnitOfMeasures on p.UnitOfMeasureId equals um.Id
                        select new {
                            p.Id,
                            Product = p.Name,
                            UM = um.Name,

                            SaldoAnterior = (from ip in _db.InPutProducts
                                join ipd in _db.InPutProductDetails on ip.Id equals ipd.InPutProductId
                                where ip.AreaId == request.AreaId && ipd.ProductId == p.Id && ip.StateId == 1 && ip.Date < request.From.Date
                                select ipd).Sum(x => Convert.ToDecimal(x.Quantity) * x.Cost)
                                - 
                                (from op in _db.OutPutProducts
                                join opd in _db.OutPutProductDetails on op.Id equals opd.OutPutProductId
                                where op.AreaId == request.AreaId && opd.ProductId == p.Id && op.StateId == 1 && op.Date < request.From.Date
                                select opd).Sum(x => Convert.ToDecimal(x.Quantity) * x.Cost),

                            Entradas = (from ip in _db.InPutProducts
                                join ipd in _db.InPutProductDetails on ip.Id equals ipd.InPutProductId
                                where ip.AreaId == request.AreaId && ipd.ProductId == p.Id && ip.StateId == 1 && ip.Date >= request.From.Date && ip.Date <= request.To.Date
                                select ipd).Sum(x => Convert.ToDecimal(x.Quantity) * x.Cost),

                            Salidas =  (from op in _db.OutPutProducts
                                join opd in _db.OutPutProductDetails on op.Id equals opd.OutPutProductId
                                where op.AreaId == request.AreaId && opd.ProductId == p.Id && op.StateId == 1 && op.Date >= request.From.Date && op.Date <= request.To.Date
                                select opd).Sum(x => Convert.ToDecimal(x.Quantity) * x.Cost)
                        };
                        

            result = result.Where(x => x.SaldoAnterior + x.Entradas - x.Salidas > 0);

            return Json(result);
        }

        [HttpPost("api/reports/comprobantes")]
        public IActionResult Comprobantes([FromBody] ReportRequest request)
        {
         
            var result = from p in _db.Products
                        select new {
                            p.Id,
                            Product = p.Name,

                            Debe = (from ip in _db.InPutProducts
                                join ipd in _db.InPutProductDetails on ip.Id equals ipd.InPutProductId
                                where ip.AreaId == request.AreaId && ipd.ProductId == p.Id && ip.StateId == 1 && ip.Date >= request.From.Date && ip.Date <= request.To.Date
                                select ipd).Sum(x => x.Total),

                            Haber =  (from op in _db.OutPutProducts
                                join opd in _db.OutPutProductDetails on op.Id equals opd.OutPutProductId
                                where op.AreaId == request.AreaId && opd.ProductId == p.Id && op.StateId == 1 && op.Date >= request.From.Date && op.Date <= request.To.Date
                                select opd).Sum(x => x.Total)
                        };
                        

            result = result.Where(x => x.Debe != 0 || x.Haber != 0);

            return Json(result);
        }

        [HttpPost("api/reports/downloaded")]
        public IActionResult Downloaded([FromBody] ReportRequest request)
        {

            

            var salidasInss = (from wo in _db.WorkOrders
                           join wod in _db.WorkOrderDetails on wo.Id equals wod.WorkOrderId
                           join p in _db.Products on wod.ProductId equals p.Id
                           join f in _db.Follows on wo.FollowId equals f.Id
                           join a in _db.Admissions on f.AdmissionId equals a.Id
                           join b in _db.Beneficiaries on a.BeneficiaryId equals b.Id
                           join d in _db.Doctors on wo.DoctorId equals d.Id
                           where f.AreaTargetId == request.AreaId && wo.Active == true
                           && wo.Date >= request.From.Date && wo.Date <= request.To.Date
                           select new {
                                wod.ProductId,
                                Producto = p.Name,
                                wo.Date,
                                wod.Quantity,
                                wod.Price,
                                Total = Convert.ToDecimal(wod.Quantity) * wod.Price,
                                wo.Reference,
                                wo.Id,
                                FollowId=f.Id,
                                a.BeneficiaryId,
                                Beneficiary = b.GetFullName(),
                                wo.CreateAt,
                                wo.CreateBy,
                                Type="Pte Inss",
                                Identity = a.Inss,
                                wo.DoctorId,
                                d.Name
                           }).ToList();

            var salidasPrivados = (from wo in _db.PrivateWorkOrders
                           join wod in _db.PrivateWorkOrderDetails on wo.Id equals wod.PrivateWorkOrderId
                           join p in _db.Products on wod.ProductId equals p.Id
                           join f in _db.FollowsPrivates on wo.FollowsPrivateId equals f.Id
                           join a in _db.Bills on f.BillId equals a.Id
                           join b in _db.PrivateCustomers on a.PrivateCustomerId equals b.Id
                           join d in _db.Doctors on wo.DoctorId equals d.Id
                           where f.AreaTargetId == request.AreaId && wo.Active == true
                           && wo.Date >= request.From.Date && wo.Date <= request.To.Date
                           select new {
                                wod.ProductId,
                                Producto = p.Name,
                                wo.Date,
                                wod.Quantity,
                                wod.Price,
                                Total = Convert.ToDecimal(wod.Quantity) * wod.Price,
                                wo.Reference,
                                wo.Id,
                                FollowId=f.Id,
                                BeneficiaryId = a.PrivateCustomerId,
                                Beneficiary = b.GetFullName(),
                                wo.CreateAt,
                                wo.CreateBy,
                                Type="Privado/Convenio",
                                Identity = b.Id,
                                wo.DoctorId,
                                d.Name
                           }).ToList();

            var data = salidasInss.Concat(salidasPrivados);

            if(request.DoctorId.HasValue && request.DoctorId > 0)
                data = data.Where(x => x.DoctorId == request.DoctorId);

            if(request.ProductId.HasValue && request.ProductId > 0)
                data = data.Where(x => x.ProductId == request.ProductId);
          

            return Json(data);
        }
        
        [HttpPost("api/reports/salesed")]
        public IActionResult Salesed([FromBody] ReportRequest request)
        {

            var sales = _db.Bills.Where(x => x.Active && x.AreaId == request.AreaId
                && x.CreateAt.Date >= request.From.Date 
                && x.CreateAt.Date <= request.To.Date).Select(x => new {

                    x.CreateAt,
                    Date = x.CreateAt.Date,
                    x.CreateBy,
                    x.IsCredit,
                    TotalC = UserHelpers.GeyTotalC(x.Total, x.Rate, x.CurrencyId),
                    TotalD = UserHelpers.GeyTotalD(x.Total, x.Rate, x.CurrencyId),                    
                    x.Id,

                });      

            return Json(sales);
        }

        [HttpPost("api/reports/salesed-details")]
        public IActionResult SalesedDetails([FromBody] ReportRequest request)
        {

            var salesProducts = from b in _db.Bills
                        join bd in _db.BillDetails on b.Id equals bd.BillId
                        join p in _db.Products on bd.ProductId equals p.Id
                        where b.Active == true && bd.IsService == false
                        && b.CreateAt.Date >= request.From.Date 
                        && b.CreateAt.Date <= request.To.Date 
                        && b.AreaId == request.AreaId
                        select new {

                            b.Id,
                            p.Name,
                            b.IsCredit,
                            b.CreateAt,
                            b.CreateBy,
                            bd.Quantity,
                            bd.Price,
                            bd.Total,
                            
                            Date = b.CreateAt.Date

                        };

            return Json(salesProducts);
        }
        

        [HttpPost("api/reports/stock")]
        public IActionResult Stock([FromBody] StockRequest request)
        {

            IQueryable<VwStocksForArea> result = _db.VwStocksForAreas;

            if (request.AreaId.HasValue)
                result = result.Where(x => x.AreaId == request.AreaId.Value);

            if (request.ProductId.HasValue)
                result = result.Where(x => x.ProductId == request.ProductId.Value);

            if (request.WithStock)
                result = result.Where(x => x.Stock > 0);

            return Json(result);
        }

    }
}
