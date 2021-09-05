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
    public class FollowsPrivates : Controller
    {      
        private ClinicaContext _db = null;
        public FollowsPrivates(ClinicaContext db)
        {
            this._db = db;
        }

        [Route("api/followsprivate/get/{areaId}")]
        public IActionResult Get(int areaId,int skip, int take, IDictionary<string, string> values) 
        {
            IQueryable<VwFollowsPrivate> follows = _db.VwFollowsPrivates.Where(x => x.AreaTargetId == areaId)
            .OrderByDescending(x => x.Id);

            if (values.ContainsKey("id"))
            {
                var id = Convert.ToInt32(values["id"]);
                follows = follows.Where(x => x.Id == id);
            }

            if (values.ContainsKey("billId"))
            {
                var billId = Convert.ToInt32(values["billId"]);
                follows = follows.Where(x => x.BillId == billId);
            }

            if (values.ContainsKey("billTypeId"))
            {
                var billTypeId = Convert.ToInt32(values["billTypeId"]);
                follows = follows.Where(x => x.BillTypeId == billTypeId);
            }

            if (values.ContainsKey("privateCustomerTypeId"))
            {
                var privateCustomerTypeId = Convert.ToInt32(values["privateCustomerTypeId"]);
                follows = follows.Where(x => x.PrivateCustomerTypeId == privateCustomerTypeId);
            }

            var items = follows.Skip(skip).Take(take);

            return Json(new
            {
                items,
                totalCount = follows.Count()
            });

        }      

        [HttpPost("api/followsprivate/post")]
        public IActionResult Post([FromBody] FollowsPrivate follow) 
        {
            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");
            
            var bill = _db.Bills.FirstOrDefault(x => x.Id == follow.BillId);

            if(!bill.Active)
                return BadRequest("No se puede porque la factura esta anulada");

             if(bill.Finished)
                return BadRequest("La factura ya no es valida porque ya ha sido egresado el paciente");
                
            follow.AreaSourceId = user.AreaId;
            follow.CreateAt = UserHelpers.GetTimeInfo();
            follow.CreateBy = user.Username;

            _db.FollowsPrivates.Add(follow);
         
            _db.SaveChanges();

            return Json(follow);

        }

        

        [HttpPost("api/followsprivate/post/withproduct/Admission/{billId}/areaTarget/{areaTargetId}")]
        public IActionResult PostWithProduct(int billId, int areaTargetId, [FromBody] PrivateWorkPreOrder workPreOrder)
        {
            var user = this.GetAppUser(_db);
            if (user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            var bill = _db.Bills.FirstOrDefault(x => x.Id == billId);

            if (!bill.Active)
                return BadRequest("No se puede porque la factura esta anulada");

            if (bill.Finished)
                return BadRequest("La factura ya no esta valida porque ya ha sido egresado el paciente");

            workPreOrder.CreateAt = UserHelpers.GetTimeInfo();
            workPreOrder.CreateBy = user.Username;
            workPreOrder.Used = false;

            var follow = new FollowsPrivate();
            follow.BillId = billId;
            follow.AreaTargetId = areaTargetId;
            follow.AreaSourceId = user.AreaId;
            follow.Observation = workPreOrder.Observation;
            follow.CreateAt = UserHelpers.GetTimeInfo();
            follow.CreateBy = user.Username;
            follow.PrivateWorkPreOrders.Add(workPreOrder);

            _db.FollowsPrivates.Add(follow);

            _db.SaveChanges();

            return Json(follow);

        }

        [Route("api/followsprivate/{followId}/getWorkPreOrders")]
        public IActionResult PostWithProduct(int followId)
        {

            var result = _db.PrivateWorkPreOrders.Include(x => x.PrivateWorkPreOrderDetails)
            .FirstOrDefault(x => x.FollowsPrivateId == followId && !x.Used);
            return Json(result);

        }

        [HttpPost("api/followsprivate/post/withservice/Admission/{billId}/areaTarget/{areaTargetId}")]
        public IActionResult PostWithService(int billId, int areaTargetId, [FromBody] PrivateSendTest sendTest)
        {
            var user = this.GetAppUser(_db);
            if (user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            var bill = _db.Bills.FirstOrDefault(x => x.Id == billId);

            if (!bill.Active)
                return BadRequest("No se puede porque la admision esta anulada");

            if (bill.Finished)
                return BadRequest("La admision ya no esta valida porque ya ha sido egresado el paciente");



            sendTest.CreateAt = UserHelpers.GetTimeInfo();
            sendTest.CreateBy = user.Username;
            sendTest.Date = UserHelpers.GetTimeInfo();

            var follow = new FollowsPrivate();
            follow.BillId = billId;
            follow.AreaTargetId = areaTargetId;
            follow.AreaSourceId = user.AreaId;
            follow.Observation = "Transferencia a laboratorio";
            follow.CreateAt = UserHelpers.GetTimeInfo();
            follow.CreateBy = user.Username;
            follow.PrivateSendTests.Add(sendTest);


            var serviceTest = new PrivateServiceTest
            {
                SendTest = sendTest,
                Date = UserHelpers.GetTimeInfo(),
                CreateAt = UserHelpers.GetTimeInfo(),
                CreateBy = user.Username
                ,
                DoctorId = sendTest.DoctorId,
            };

            foreach (var item in sendTest.PrivateSendTestDetails)
            {
                var service = _db.Services.FirstOrDefault(x => x.Id == item.Serviceid);

                if (service.IsCultive)//Cultivo
                {

                    serviceTest.PrivateServiceTestCultives.Add(new PrivateServiceTestCultive
                    {
                        ServiceTest = serviceTest,
                        ServiceId = item.Serviceid,
                        Name = service.Name
                    });

                }
                else if (item.Serviceid == 8)//BAAR
                {
                    for (int i = 1; i <= 3; i++)
                    {
                        serviceTest.PrivateServiceTestBaarDetails.Add(new PrivateServiceTestBaarDetail
                        {
                            ServiceTest = serviceTest,
                            ServiceId = item.Serviceid,
                            TestNumber = i
                        });
                    }
                }
                else
                {
                    var serviceDetails = _db.ServiceDetails.Where(x => x.ServiceId == item.Serviceid);

                    foreach (var item2 in serviceDetails)
                    {
                        serviceTest.PrivateServiceTestDetails.Add(new PrivateServiceTestDetail
                        {
                            ServiceTest = serviceTest,
                            ServiceId = item.Serviceid,
                            ServiceDetailId = item2.Id,

                            Name = item2.Name,
                            Um = item2.Um,
                            Reference = item2.Reference,

                            Result = "",
                            ResultJson = "",
                        });
                    }
                }

            }

            follow.PrivateServiceTests.Add(serviceTest);

            _db.FollowsPrivates.Add(follow);


            _db.SaveChanges();

            return Json(follow);

        }

        [Route("api/followsprivate/{followId}/getServicesSent")]
        public IActionResult PostWithService(int followId)
        {

            var result = _db.PrivateServiceTests
            .Include(x => x.Doctor)
            .Include(x => x.PrivateServiceTestDetails).Where(x => x.FollowId == followId);
            return Json(result);

        }

        [Route("api/followsprivate/{followId}/getServicesSent/{id}")]
        public IActionResult PostWithService(int followId, int id)
        {

            var result = from s in _db.Services
                         join st in _db.PrivateSendTestDetails on s.Id equals st.Serviceid
                         where st.PrivateSendTestId == id
                         select s;

            return Json(result);

        }

        [Route("api/followsprivate/{serviceTestId}/getServicesSent/{serviceId}/Details")]
        public IActionResult PostWithServiceDetails(int serviceTestId, int serviceId)
        {

            var result = _db.PrivateServiceTestDetails
            .Where(x => x.ServiceTestId == serviceTestId && x.ServiceId == serviceId);
            return Json(result);


        }

        [HttpPost("api/followsprivate/{serviceTestId}/getServicesSent/{serviceId}/Details")]
        public IActionResult SaveResutls([FromBody] ServiceTestDetail serviceTestDetail)
        {

            var oldServiceTestDetail = _db.PrivateServiceTestDetails.FirstOrDefault(x => x.Id == serviceTestDetail.Id);
            oldServiceTestDetail.Result = serviceTestDetail.Result;
            _db.SaveChanges();
            return Json(serviceTestDetail);



        }
        //GET BAAR
        [Route("api/followsprivate/{serviceTestId}/getServicesSent/{serviceId}/Details/baar")]
        public IActionResult PostWithServiceDetailsBaar(int serviceTestId)
        {

            var result = _db.PrivateServiceTestBaarDetails.Where(x => x.ServiceTestId == serviceTestId);
            return Json(result);


        }

        [HttpPost("api/followsprivate/{serviceTestId}/getServicesSent/{serviceId}/Details/baar")]
        public IActionResult SaveResutlsBaar([FromBody] ServiceTestBaarDetail serviceTestBaar)
        {

            var oldServiceTestDetail = _db.PrivateServiceTestBaarDetails.FirstOrDefault(x => x.Id == serviceTestBaar.Id);
            oldServiceTestDetail.TestDate = serviceTestBaar.TestDate;
            oldServiceTestDetail.Appearance = serviceTestBaar.Appearance;
            oldServiceTestDetail.ObservationBk = serviceTestBaar.ObservationBk;
            oldServiceTestDetail.Observation = serviceTestBaar.Observation;
            oldServiceTestDetail.AppearanceBio = serviceTestBaar.AppearanceBio;
            _db.SaveChanges();

            return Json(serviceTestBaar);



        }

        //GET CULTIVO
        [Route("api/followsprivate/{serviceTestId}/getServicesSent/{serviceId}/Details/cultivos")]
        public IActionResult PostWithServiceDetailsCultivos(int serviceTestId)
        {

            var result = _db.PrivateServiceTestCultives
            .Include(x => x.PrivateServiceTestCultiveAntiBiotics)
            .Include(x => x.PrivateServiceTestCultiveFrescs)
            .FirstOrDefault(x => x.ServiceTestId == serviceTestId);
            return Json(result);


        }

        [HttpPost("api/followsprivate/{serviceTestId}/getServicesSent/{serviceId}/Details/cultivos")]
        public IActionResult SaveResutlsBaar([FromBody] PrivateServiceTestCultive serviceTest)
        {

            var oldServiceTestDetail = _db.PrivateServiceTestCultives.FirstOrDefault(x => x.Id == serviceTest.Id);

            oldServiceTestDetail.TestDate = serviceTest.TestDate;
            oldServiceTestDetail.Gram = serviceTest.Gram;
            oldServiceTestDetail.Isolated = serviceTest.Isolated;
            oldServiceTestDetail.Aminas = serviceTest.Aminas;
            oldServiceTestDetail.Observation = serviceTest.Observation;
            oldServiceTestDetail.Mycologycal = serviceTest.Mycologycal;

            var antiBioticos = _db.PrivateServiceTestCultiveAntiBiotics.Where(x => x.ServiceTestCultiveId == serviceTest.Id);
            _db.PrivateServiceTestCultiveAntiBiotics.RemoveRange(antiBioticos);

            var antiFrescs = _db.PrivateServiceTestCultiveFrescs.Where(x => x.ServiceTestCultiveId == serviceTest.Id);
            _db.PrivateServiceTestCultiveFrescs.RemoveRange(antiFrescs);

            _db.SaveChanges();

            foreach (var item in serviceTest.PrivateServiceTestCultiveAntiBiotics)
            {
                _db.PrivateServiceTestCultiveAntiBiotics.Add(new PrivateServiceTestCultiveAntiBiotic
                {
                    ServiceTestCultiveId = item.ServiceTestCultiveId,
                    ResultId = item.ResultId,
                    TestId = item.TestId,
                });
            }


            foreach (var item in serviceTest.PrivateServiceTestCultiveFrescs)
            {
                _db.PrivateServiceTestCultiveFrescs.Add(new PrivateServiceTestCultiveFresc
                {
                    ServiceTestCultiveId = item.ServiceTestCultiveId,
                    ResultId = item.ResultId,
                    TestId = item.TestId,
                });
            }          

            _db.SaveChanges();

            return Json(serviceTest);



        }
    
    }
}
