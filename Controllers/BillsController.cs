using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AtencionClinica.Extensions;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

namespace AtencionClinica.Controllers
{
    [Authorize]  
    public class BillsController : Controller
    {      
        private ClinicaContext _db = null;
        public BillsController(ClinicaContext db)
        {
            this._db = db;
        }

        [Route("api/bill/get")]
        public IActionResult Get(int skip, int take, IDictionary<string, string> values) 
        {
             IQueryable<Bill> bills = _db.Bills
             .Include(x => x.PrivateCustomer)            
            .OrderByDescending(x => x.CreateAt);

            if (values.ContainsKey("name"))
            {
                var name = Convert.ToString(values["name"]);
                bills = bills.Where(x => x.PrivateCustomer.FirstName.StartsWith(name) || x.PrivateCustomer.LastName.StartsWith(name));
            }

            if (values.ContainsKey("currencyId"))
            {
                var currencyId = Convert.ToInt32(values["currencyId"]);
                bills = bills.Where(x => x.CurrencyId == currencyId);
            }

            if (values.ContainsKey("createAt"))
            {
                var createAt = Convert.ToDateTime(values["createAt"]);
                bills = bills.Where(x => x.CreateAt > createAt && x.CreateAt < createAt.AddDays(1));
            }

            var items = bills.Skip(skip).Take(take).Select(x => new {
                x.Id,            
                Nombre = x.PrivateCustomer.GetFullName(),
                x.AreaId,
                x.BillTypeId,
                x.CreateAt,
                x.CreateBy,
                x.Active,
                x.Total,
                x.CurrencyId
            });

            return Json(new
            {
                items,
                totalCount = bills.Count()
            });

        }      

        [HttpPost("api/bill/post")]
        public IActionResult Post([FromBody] Bill bill) 
        {
            var user = this.GetAppUser();
            
            //admission.Inss = bene.Inss;
            bill.Active = true;
            bill.Total = bill.BillDetails.Sum(x => x.Total);
            bill.CreateAt = DateTime.Now;
            bill.CreateBy = user.Username;
            _db.Bills.Add(bill);    

            _db.SaveChanges();      

            var follow = new FollowsPrivate{
                BillId = bill.Id,
                AreaSourceId = 3, //caja
                AreaTargetId = bill.AreaId,
                Observation = "Tranferencia automatica desde caja",
                CreateAt = DateTime.Today,
                CreateBy = user.Username                
            };

            _db.FollowsPrivates.Add(follow);

            _db.SaveChanges();

            return Json(bill);

        }      

        [HttpGet("api/bill/{id}/delete")]
        public IActionResult Delete(int id) {
            var bill = _db.Bills.FirstOrDefault(x => x.Id == id);
            //TODO verificar si no hay descargue de inventario para poder anular
            if(bill != null)
            {
                bill.Active = false;
                _db.SaveChanges();
            }

            return Json(new { n = id });
        } 
    }
}
