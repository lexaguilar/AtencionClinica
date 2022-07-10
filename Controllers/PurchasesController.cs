using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AtencionClinica.Extensions;
using AtencionClinica.Models;
using AtencionClinica.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace AtencionClinica.Controllers
{
    [Authorize]
    public class PurchasesController : Controller
    {
        private ClinicaContext _db = null;
        private IPurchaseService _service;
        public PurchasesController(ClinicaContext db, IPurchaseService service)
        {
            this._db = db;
            _service = service;
        }

        [Route("api/[Controller]/get/{id}")]

        public IActionResult GetById(int id)
        {
            var result = _db.Purchases.Include(x => x.PurchaseDetails).FirstOrDefault(x => x.Id == id);
            return Json(result);
        }

        [Route("api/[Controller]/get")]
        public IActionResult Get(int skip, int take, IDictionary<string, string> values)
        {

            var user = this.GetAppUser(_db);
            if (user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            IQueryable<Purchase> purchases = _db.Purchases.Where(x => x.AreaId == user.AreaId)
           .OrderByDescending(x => x.Id);

            if (values.ContainsKey("id"))
            {
                var id = Convert.ToInt32(values["id"]);
                purchases = purchases.Where(x => x.Id == id);
            }

            if (values.ContainsKey("createAt"))
            {
                var createAt = Convert.ToDateTime(values["createAt"]);
                var createAtEnd = Convert.ToDateTime(values["createAtEnd"]);
                purchases = purchases.Where(x => x.Date >= createAt && x.Date < createAtEnd);
            }

            if (values.ContainsKey("reference"))
            {
                var reference = Convert.ToString(values["reference"]);
                purchases = purchases.Where(x => x.Reference == reference);
            }

            if(values.ContainsKey("areaId")){
                var areaId = Convert.ToInt32(values["areaId"]);
                purchases = purchases.Where(x => x.AreaId == areaId);
            }

            if(values.ContainsKey("purchaseTypeId")){
                var purchaseTypeId = Convert.ToInt32(values["purchaseTypeId"]);
                purchases = purchases.Where(x => x.PurchaseTypeId== purchaseTypeId);
            }

            if(values.ContainsKey("statusId")){
                var statusId = Convert.ToInt32(values["statusId"]);
                purchases = purchases.Where(x => x.StatusId == statusId);
            }

            var totalCount = purchases.Count();

            if (values.ContainsKey("requireTotalCount"))
            {
               var requireTotalCount = Convert.ToBoolean(values["requireTotalCount"]);
                if (requireTotalCount){
                        purchases = purchases.Skip(skip).Take(take);                
                }
            }

            return Json(new
            {
                items = purchases,
                totalCount
            });

        }

        [Route("api/[Controller]/area/{areaId}/get")]
        public IActionResult Get(int areaId)
        {
            var result = _db.AreaServices.Include(x => x.Service).Where(x => x.AreaId == areaId).Select(x => x.Service);

            return Json(result);

        }

        [HttpPost("api/[Controller]/post")]
        public IActionResult Post([FromBody] Purchase purchase)
        {

            var user = this.GetAppUser(_db);
            if (user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            if (purchase.Id == 0)
            {

                purchase.CreateBy = user.Username;

                var result = _service.Create(purchase);

                if (!result.IsSuccess)
                    return BadRequest(result.Error);

            }
            else
            {
                var result = _service.Update(purchase);

                if (!result.IsSuccess)
                    return BadRequest(result.Error);
            }

            _db.SaveChanges();

            return Json(purchase);

        }

        [HttpPost("api/[Controller]/[action]")]
        public IActionResult Process([FromBody] Purchase purchase)
        {
            var result = _service.Process(this.User.Identity.Name, purchase.Id);
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Json(new {purchase.Id});

        }

        [HttpGet("api/[Controller]/{id}/delete")]
        public IActionResult Delete(int id)
        {
            var purchase = _db.Purchases.Include(x => x.PurchaseDetails).FirstOrDefault(x => x.Id == id);

            var result = _service.Delete(id);

            if (!result.IsSuccess)
                return BadRequest(result.Error);

            return Json(new {id});
        }

    }
}
