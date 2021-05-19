using System;
using System.Data;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AtencionClinica.Extensions;
using AtencionClinica.Models;
using AtencionClinica.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace AtencionClinica.Controllers
{
    [Authorize]
    public class HemoLogsController : Controller
    {
        private ClinicaContext _db = null;
        private IProductServices<HemoLog> _service;
        public HemoLogsController(ClinicaContext db, IProductServices<HemoLog> service)
        {
            this._db = db;
             _service = service;
        }

        [Route("api/HemoLogs/get")]
        public IActionResult Get(int inss)
        {

            var result = _db.HemoLogs.Include(x => x.Group).OrderByDescending(x => x.Date);

            return Json(result);
        }

        [Route("api/HemoLogs/get/{id}/details")]
        public IActionResult GetDetails(int id)
        {

            var result = _db.HemoLogDetails
            .Include(x => x.Product)
            .Include(x => x.PrivateCustomer)
            .Where(x => x.HemoLogId == id).Select(x => new {
                Customer = x.PrivateCustomer.GetFullName(),
                ProductId = x.ProductId,
                Product = x.Product.Name,
                x.Quantity,
                x.Cost,
                Total = Convert.ToDecimal(x.Quantity)  * x.Cost
            });

            return Json(result);
        }


        [Route("api/HemoLogs/post")]
        public IActionResult Post()
        {
            var user = this.GetAppUser(_db);

            var hoy = DateTime.Today;

            if(_db.HemoLogs.Any(x => x.Date == hoy))
                return BadRequest("Ya existe un descargue de inventario el dia de hoy");

            var groups = (from g in _db.Groups
                        join gd in _db.GroupProductsByDays on g.Id equals gd.GroupId
                        where gd.DayOfWeek == (int)hoy.DayOfWeek
                        select new {
                            Id = g.Id,
                            gd.DayOfWeek
                        }).ToArray();

            if(groups.Length == 0)
                return BadRequest("No se encontró configuración para el dia de hoy"); 
            

            foreach (var group in groups)
            {
                var groupProducts = _db.GroupProducts.Where(x => x.GroupId == group.Id).ToArray();
                var groupClients = _db.GroupProductPrivateCustumers.Where(x => x.GroupId == group.Id).ToArray();

                var hemo = new HemoLog{
                    GroupId = group.Id,
                    Date = hoy,
                   CreateBy = user.Username                           
                };

                
                foreach (var client in groupClients)
                {
                    foreach (var product in groupProducts)
                    {
                        var hemoDetail = new HemoLogDetail();

                        hemoDetail.PrivateCustomerId = client.PrivateCustomerId;
                        hemoDetail.ProductId = product.ProductId;
                        hemoDetail.Quantity = product.Quantity;

                        hemo.HemoLogDetails.Add(hemoDetail);
                    }
                }


                var result = _service.Create(hemo);

                if(!result.IsValid)
                    return BadRequest(result.Error);

                _db.SaveChanges();
            }


            return Json(new{});

        }



    }
}
