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
    public class WorkOrdersController : Controller
    {
        private ClinicaContext _db = null;

        private IProductServices<WorkOrder> _service;
        public WorkOrdersController(ClinicaContext db, IProductServices<WorkOrder> service)
        {
            this._db = db;
            _service = service;
        }

        [Route("api/workOrders/get")]
        public IActionResult Get(int followId, int skip, int take)
        {
            IQueryable<WorkOrder> workOrders = _db.WorkOrders.Where(x => x.FollowId == followId)
           .OrderByDescending(x => x.Id);

            var items = workOrders.Skip(skip).Take(take);

            return Json(new
            {
                items,
                totalCount = workOrders.Count()
            });

        }

        [HttpPost("api/workOrders/post")]
        public IActionResult Post([FromBody] WorkOrder workOrder, [FromQuery] int followId)
        {

            var user = this.GetAppUser(_db);
            if (user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            if (workOrder.Id == 0)
            {

                workOrder.CreateBy = user.Username;

                var result = _service.Create(workOrder);

                if (!result.IsValid)
                    return BadRequest(result.Error);


            }

            var workPreOrders = _db.WorkPreOrders.FirstOrDefault(x => x.FollowId == followId);
            if (workPreOrders != null)
                workPreOrders.Used = true;

            _db.SaveChanges();

            var lastOutPutProduct = _db.OutPutProducts.OrderByDescending(x => x.Id).FirstOrDefault(x => x.CreateBy == user.Username && x.AreaId == user.AreaId);

            if (lastOutPutProduct != null)
            {

                lastOutPutProduct.Reference = workOrder.Id.ToString();
                _db.SaveChanges();
            }

            //Registrar examenes
            if (user.AreaId == (int)AreaRestrict.Laboratorio)
            {
                var follow = _db.Follows.FirstOrDefault(x => x.Id == followId);
                AddTestService(user, workOrder, follow);
            }

            return Json(workOrder);

        }

        [HttpPost("api/workOrders/post/outWithFollow")]
        public IActionResult PostoOutWithFollow([FromBody] WorkOrder workOrder, [FromQuery] int id)
        {

            var user = this.GetAppUser(_db);
            if (user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            var admision = _db.Admissions.FirstOrDefault(x => x.Id == id);
            if (admision == null)
                return BadRequest($"No se encontro la admsion con id {id}");

            var newFollow = new Follow
            {

                AdmissionId = id,
                AreaSourceId = admision.AreaId,
                AreaTargetId = user.AreaId,
                Observation = "Autotranferido",
                CreateAt = UserHelpers.GetTimeInfo(),
                CreateBy = user.Username,

            };

            _db.Follows.Add(newFollow);
            _db.SaveChanges();

            if (workOrder.Id == 0)
            {

                workOrder.CreateBy = user.Username;
                workOrder.FollowId = newFollow.Id;

                var result = _service.Create(workOrder);

                if (!result.IsValid)
                {

                    _db.WorkOrders.Remove(result.model);
                    _db.Follows.Remove(newFollow);
                    _db.SaveChanges();
                    return BadRequest(result.Error);

                }

            }

            _db.SaveChanges();

            var lastOutPutProduct = _db.OutPutProducts.OrderByDescending(x => x.Id).FirstOrDefault(x => x.CreateBy == user.Username && x.AreaId == user.AreaId);

            if (lastOutPutProduct != null)
            {

                lastOutPutProduct.Reference = workOrder.Id.ToString();
                _db.SaveChanges();
            }

            //Registrar examenes
            if (user.AreaId == (int)AreaRestrict.Laboratorio)
            {
                AddTestService(user, workOrder, newFollow);
            }

            return Json(workOrder);

        }

        private void AddTestService(AppUser user, WorkOrder workOrder, Follow follow)
        {

            SendTest sendTest = new SendTest
            {
                Date = UserHelpers.GetTimeInfo(),
                DoctorId = workOrder.DoctorId,
                CreateAt = UserHelpers.GetTimeInfo(),
                CreateBy = user.Username,
            };

            foreach (var item in workOrder.WorkOrderDetails.Where(x => x.IsService))
            {
                sendTest.SendTestDetails.Add(new SendTestDetail
                {
                    Serviceid = item.ServiceId ?? 0
                });
            }

            follow.SendTests.Add(sendTest);

            WorkOrderServices _service = new WorkOrderServices(_db);

            _service.CreateTest(sendTest, follow);

            _db.SaveChanges();

        }
    }
}
