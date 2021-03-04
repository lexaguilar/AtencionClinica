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

            var result = _db.VwKardices.Where(x => x.AreaId == request.AreaId && x.ProductId == request.ProductId && x.Date >= request.Date.Date);

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
