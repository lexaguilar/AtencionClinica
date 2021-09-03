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
    public class FollowsController : Controller
    {
        private ClinicaContext _db = null;
        public FollowsController(ClinicaContext db)
        {
            this._db = db;
        }

        [Route("api/follows/get/{areaId}")]
        public IActionResult Get(int areaId, int skip, int take, IDictionary<string, string> values)
        {
            IQueryable<VwFollow> follows = _db.VwFollows.Where(x => x.AreaTargetId == areaId)
            .OrderByDescending(x => x.Id);

            if (values.ContainsKey("id"))
            {
                var id = Convert.ToInt32(values["id"]);
                follows = follows.Where(x => x.Id == id);
            }


            if (values.ContainsKey("inss"))
            {
                var inss = Convert.ToInt32(values["inss"]);
                follows = follows.Where(x => x.Inss == inss);
            }

            if (values.ContainsKey("admissionId"))
            {
                var admissionId = Convert.ToInt32(values["admissionId"]);
                follows = follows.Where(x => x.AdmissionId == admissionId);
            }

            if (values.ContainsKey("areaTargetId"))
            {
                var areaTargetId = Convert.ToInt32(values["areaTargetId"]);
                follows = follows.Where(x => x.AreaTargetId == areaTargetId);
            }

            if (values.ContainsKey("admissionTypeId"))
            {
                var admissionTypeId = Convert.ToInt32(values["admissionTypeId"]);
                follows = follows.Where(x => x.AdmissionTypeId == admissionTypeId);
            }

            if (values.ContainsKey("firstName"))
            {
                var firstName = Convert.ToString(values["firstName"]);
                follows = follows.Where(x => x.FirstName.StartsWith(firstName));
            }

            if (values.ContainsKey("lastName"))
            {
                var lastName = Convert.ToString(values["lastName"]);
                follows = follows.Where(x => x.LastName.StartsWith(lastName));
            }

            if (values.ContainsKey("identification"))
            {
                var identification = Convert.ToString(values["identification"]);
                follows = follows.Where(x => x.Identification.StartsWith(identification));
            }

            if (values.ContainsKey("createAt"))
            {
                var createAt = Convert.ToDateTime(values["createAt"]);
                var createAtEnd = Convert.ToDateTime(values["createAtEnd"]);
                follows = follows.Where(x => x.CreateAt > createAt && x.CreateAt < createAtEnd);
            }

            var items = follows.Skip(skip).Take(take);

            return Json(new
            {
                items,
                totalCount = follows.Count()
            });

        }

        [HttpPost("api/follows/post")]
        public IActionResult Post([FromBody] Follow follow)
        {
            var user = this.GetAppUser(_db);
            if (user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            var admission = _db.Admissions.FirstOrDefault(x => x.Id == follow.AdmissionId);

            if (!admission.Active)
                return BadRequest("No se puede porque la admision esta anulada");

            if (admission.Finished)
                return BadRequest("La admision ya no esta valida porque ya ha sido egresado el paciente");

            follow.AreaSourceId = user.AreaId;
            follow.CreateAt = UserHelpers.GetTimeInfo();
            follow.CreateBy = user.Username;

            _db.Follows.Add(follow);

            _db.SaveChanges();

            return Json(follow);

        }

        [HttpPost("api/follows/post/withproduct/Admission/{AdmissionId}/areaTarget/{areaTargetId}")]
        public IActionResult PostWithProduct(int admissionId, int areaTargetId, [FromBody] WorkPreOrder workPreOrder)
        {
            var user = this.GetAppUser(_db);
            if (user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            var admission = _db.Admissions.FirstOrDefault(x => x.Id == admissionId);

            if (!admission.Active)
                return BadRequest("No se puede porque la admision esta anulada");

            if (admission.Finished)
                return BadRequest("La admision ya no esta valida porque ya ha sido egresado el paciente");

            workPreOrder.CreateAt = UserHelpers.GetTimeInfo();
            workPreOrder.CreateBy = user.Username;
            workPreOrder.Used = false;

            var follow = new Follow();
            follow.AdmissionId = admissionId;
            follow.AreaTargetId = areaTargetId;
            follow.AreaSourceId = user.AreaId;
            follow.Observation = workPreOrder.Observation;
            follow.CreateAt = UserHelpers.GetTimeInfo();
            follow.CreateBy = user.Username;
            follow.WorkPreOrders.Add(workPreOrder);

            _db.Follows.Add(follow);

            _db.SaveChanges();

            return Json(follow);

        }

        [Route("api/follows/{followId}/getWorkPreOrders")]
        public IActionResult PostWithProduct(int followId)
        {

            var result = _db.WorkPreOrders.Include(x => x.WorkPreOrderDetails).FirstOrDefault(x => x.FollowId == followId && !x.Used);
            return Json(result);

        }

        [HttpPost("api/follows/post/withservice/Admission/{AdmissionId}/areaTarget/{areaTargetId}")]
        public IActionResult PostWithService(int admissionId, int areaTargetId, [FromBody] SendTest sendTest)
        {
            var user = this.GetAppUser(_db);
            if (user == null)
                return BadRequest("La informacion del usuario cambio, inicie sesion nuevamente");

            var admission = _db.Admissions.FirstOrDefault(x => x.Id == admissionId);

            if (!admission.Active)
                return BadRequest("No se puede porque la admision esta anulada");

            if (admission.Finished)
                return BadRequest("La admision ya no esta valida porque ya ha sido egresado el paciente");



            sendTest.CreateAt = UserHelpers.GetTimeInfo();
            sendTest.CreateBy = user.Username;
            sendTest.Date = UserHelpers.GetTimeInfo();

            var follow = new Follow();
            follow.AdmissionId = admissionId;
            follow.AreaTargetId = areaTargetId;
            follow.AreaSourceId = user.AreaId;
            follow.Observation = "Transferencia a laboratorio";
            follow.CreateAt = UserHelpers.GetTimeInfo();
            follow.CreateBy = user.Username;
            follow.SendTests.Add(sendTest);


            var serviceTest = new ServiceTest
            {
                SendTest = sendTest,
                Date = UserHelpers.GetTimeInfo(),
                CreateAt = UserHelpers.GetTimeInfo(),
                CreateBy = user.Username,
                DoctorId = sendTest.DoctorId,
            };

            foreach (var item in sendTest.SendTestDetails)
            {
                var service = _db.Services.FirstOrDefault(x => x.Id == item.Serviceid);

                if (service.IsCultive)//Cultivo
                {

                    serviceTest.ServiceTestCultives.Add(new ServiceTestCultive
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
                        serviceTest.ServiceTestBaarDetails.Add(new ServiceTestBaarDetail
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
                        serviceTest.ServiceTestDetails.Add(new ServiceTestDetail
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

            follow.ServiceTests.Add(serviceTest);

            _db.Follows.Add(follow);



            _db.SaveChanges();

            return Json(follow);

        }

        [Route("api/follows/{followId}/getServicesSent")]
        public IActionResult PostWithService(int followId)
        {

            var result = _db.ServiceTests
            .Include(x => x.Doctor)
            .Include(x => x.ServiceTestDetails).Where(x => x.FollowId == followId);
            return Json(result);

        }

        [Route("api/follows/{followId}/getServicesSent/{id}")]
        public IActionResult PostWithService(int followId, int id)
        {

            var result = from s in _db.Services
                         join st in _db.SendTestDetails on s.Id equals st.Serviceid
                         where st.SendTestId == id
                         select s;

            return Json(result);

        }

        [Route("api/follows/{serviceTestId}/getServicesSent/{serviceId}/Details")]
        public IActionResult PostWithServiceDetails(int serviceTestId, int serviceId)
        {

            var result = _db.ServiceTestDetails.Where(x => x.ServiceTestId == serviceTestId && x.ServiceId == serviceId);
            return Json(result);


        }

        [HttpPost("api/follows/{serviceTestId}/getServicesSent/{serviceId}/Details")]
        public IActionResult SaveResutls([FromBody] ServiceTestDetail serviceTestDetail)
        {

            var oldServiceTestDetail = _db.ServiceTestDetails.FirstOrDefault(x => x.Id == serviceTestDetail.Id);
            oldServiceTestDetail.Result = serviceTestDetail.Result;
            _db.SaveChanges();
            return Json(serviceTestDetail);



        }
        //GET BAAR
        [Route("api/follows/{serviceTestId}/getServicesSent/{serviceId}/Details/baar")]
        public IActionResult PostWithServiceDetailsBaar(int serviceTestId)
        {

            var result = _db.ServiceTestBaarDetails.Where(x => x.ServiceTestId == serviceTestId);
            return Json(result);


        }

        [HttpPost("api/follows/{serviceTestId}/getServicesSent/{serviceId}/Details/baar")]
        public IActionResult SaveResutlsBaar([FromBody] ServiceTestBaarDetail serviceTestBaar)
        {

            var oldServiceTestDetail = _db.ServiceTestBaarDetails.FirstOrDefault(x => x.Id == serviceTestBaar.Id);
            oldServiceTestDetail.TestDate = serviceTestBaar.TestDate;
            oldServiceTestDetail.Appearance = serviceTestBaar.Appearance;
            oldServiceTestDetail.ObservationBk = serviceTestBaar.ObservationBk;
            oldServiceTestDetail.Observation = serviceTestBaar.Observation;
            oldServiceTestDetail.AppearanceBio = serviceTestBaar.AppearanceBio;
            _db.SaveChanges();

            return Json(serviceTestBaar);



        }

        //GET CULTIVO
        [Route("api/follows/{serviceTestId}/getServicesSent/{serviceId}/Details/cultivos")]
        public IActionResult PostWithServiceDetailsCultivos(int serviceTestId)
        {

            var result = _db.ServiceTestCultives
            .Include(x => x.ServiceTestCultiveAntiBiotics)
            .Include(x => x.ServiceTestCultiveFrescs)
            .FirstOrDefault(x => x.ServiceTestId == serviceTestId);
            return Json(result);


        }

        [HttpPost("api/follows/{serviceTestId}/getServicesSent/{serviceId}/Details/cultivos")]
        public IActionResult SaveResutlsBaar([FromBody] ServiceTestCultive serviceTest)
        {

            var oldServiceTestDetail = _db.ServiceTestCultives.FirstOrDefault(x => x.Id == serviceTest.Id);

            oldServiceTestDetail.TestDate = serviceTest.TestDate;
            oldServiceTestDetail.Gram = serviceTest.Gram;
            oldServiceTestDetail.Isolated = serviceTest.Isolated;
            oldServiceTestDetail.Aminas = serviceTest.Aminas;
            oldServiceTestDetail.Observation = serviceTest.Observation;
            oldServiceTestDetail.Mycologycal = serviceTest.Mycologycal;

            var antiBioticos = _db.ServiceTestCultiveAntiBiotics.Where(x => x.ServiceTestCultiveId == serviceTest.Id);
            _db.ServiceTestCultiveAntiBiotics.RemoveRange(antiBioticos);

            var antiFrescs = _db.ServiceTestCultiveFrescs.Where(x => x.ServiceTestCultiveId == serviceTest.Id);
            _db.ServiceTestCultiveFrescs.RemoveRange(antiFrescs);

            _db.SaveChanges();

            foreach (var item in serviceTest.ServiceTestCultiveAntiBiotics)
            {
                _db.ServiceTestCultiveAntiBiotics.Add(new ServiceTestCultiveAntiBiotic
                {
                    ServiceTestCultiveId = item.ServiceTestCultiveId,
                    ResultId = item.ResultId,
                    TestId = item.TestId,
                });
            }


            foreach (var item in serviceTest.ServiceTestCultiveFrescs)
            {
                _db.ServiceTestCultiveFrescs.Add(new ServiceTestCultiveFresc
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
