using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AtencionClinica.Extensions;
using AtencionClinica.Models;
using AtencionClinica.Services;
using AtencionClinica.ViewModel;
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
    public class AdmisionsController : Controller
    {      
        private ClinicaContext _db = null;
        
        public AdmisionsController(ClinicaContext db)
        {
            this._db = db;
        }

        [Route("api/admisions/puestomedico/get")]
        public IActionResult GetPuestoMedico(int skip, int take, IDictionary<string, string> values) 
        {
             IQueryable<Admission> admissions = _db.Admissions
             .Include(x => x.Area)
             .Include(x => x.Beneficiary)
             .ThenInclude(x => x.Relationship)  
             .Where(x => x.Area.TypeId == 3)
            .OrderByDescending(x => x.CreateAt);

            if (values.ContainsKey("nombre"))
            {
                var nombre = Convert.ToString(values["nombre"]);
                admissions = admissions.Where(x => x.Beneficiary.FirstName.StartsWith(nombre) || x.Beneficiary.LastName.StartsWith(nombre));
            }

            if (values.ContainsKey("inss"))
            {
                var inss = Convert.ToInt32(values["inss"]);
                admissions = admissions.Where(x => x.Inss == inss);
            }

            if (values.ContainsKey("id"))
            {
                var id = Convert.ToInt32(values["id"]);
                admissions = admissions.Where(x => x.Id == id);
            }

            if (values.ContainsKey("areaId"))
            {
                var areaId = Convert.ToInt32(values["areaId"]);
                admissions = admissions.Where(x => x.AreaId == areaId);
            }

            if (values.ContainsKey("specialtyId"))
            {
                var specialtyId = Convert.ToInt32(values["specialtyId"]);
                admissions = admissions.Where(x => x.SpecialtyId == specialtyId);
            }


            if (values.ContainsKey("typeId"))
            {
                var typeId = Convert.ToInt32(values["typeId"]);
                admissions = admissions.Where(x => x.TypeId == typeId);
            }

            if (values.ContainsKey("identification"))
            {
                var identification = Convert.ToString(values["identification"]);
                admissions = admissions.Where(x => x.Identification.StartsWith(identification));
            }

            if (values.ContainsKey("createAt"))
            {
                var createAt = Convert.ToDateTime(values["createAt"]);
                var createAtEnd = Convert.ToDateTime(values["createAtEnd"]);
                admissions = admissions.Where(x => x.CreateAt > createAt && x.CreateAt < createAtEnd);
            }

            if (values.ContainsKey("createBy"))
            {
                var createBy = Convert.ToString(values["createBy"]);
                admissions = admissions.Where(x => x.CreateBy == createBy);
            }

            var items = admissions.Skip(skip).Take(take).Select(x => new {
                x.Id,
                x.NumberOfDay,
                x.Inss,
                Nombre = x.Beneficiary.GetFullName(),
                Tipo = $"{x.Beneficiary.Relationship.Name}",
                x.AreaId,
                x.TypeId,
                x.SpecialtyId,
                x.CreateAt,
                x.CreateBy,
                x.Active,
                x.Identification
            });

            return Json(new
            {
                items,
                totalCount = admissions.Count()
            });

        }      

        [Route("api/admisions/get")]
        public IActionResult Get(int skip, int take, IDictionary<string, string> values) 
        {
             IQueryable<Admission> admissions = _db.Admissions
             .Include(x => x.Beneficiary).ThenInclude(x => x.Relationship)            
            .OrderByDescending(x => x.CreateAt);

            if (values.ContainsKey("nombre"))
            {
                var nombre = Convert.ToString(values["nombre"]);
                admissions = admissions.Where(x => x.Beneficiary.FirstName.StartsWith(nombre) || x.Beneficiary.LastName.StartsWith(nombre));
            }

            if (values.ContainsKey("inss"))
            {
                var inss = Convert.ToInt32(values["inss"]);
                admissions = admissions.Where(x => x.Inss == inss);
            }

            if (values.ContainsKey("id"))
            {
                var id = Convert.ToInt32(values["id"]);
                admissions = admissions.Where(x => x.Id == id);
            }

            if (values.ContainsKey("areaId"))
            {
                var areaId = Convert.ToInt32(values["areaId"]);
                admissions = admissions.Where(x => x.AreaId == areaId);
            }

            if (values.ContainsKey("specialtyId"))
            {
                var specialtyId = Convert.ToInt32(values["specialtyId"]);
                admissions = admissions.Where(x => x.SpecialtyId == specialtyId);
            }


            if (values.ContainsKey("typeId"))
            {
                var typeId = Convert.ToInt32(values["typeId"]);
                admissions = admissions.Where(x => x.TypeId == typeId);
            }

            if (values.ContainsKey("identification"))
            {
                var identification = Convert.ToString(values["identification"]);
                admissions = admissions.Where(x => x.Identification.StartsWith(identification));
            }

            if (values.ContainsKey("createAt"))
            {
                var createAt = Convert.ToDateTime(values["createAt"]);
                var createAtEnd = Convert.ToDateTime(values["createAtEnd"]);
                admissions = admissions.Where(x => x.CreateAt > createAt && x.CreateAt < createAtEnd);
            }

            if (values.ContainsKey("createBy"))
            {
                var createBy = Convert.ToString(values["createBy"]);
                admissions = admissions.Where(x => x.CreateBy == createBy);
            }

            var items = admissions.Skip(skip).Take(take).Select(x => new {
                x.Id,
                x.NumberOfDay,
                x.Inss,
                Nombre = x.Beneficiary.GetFullName(),
                Tipo = $"{x.Beneficiary.Relationship.Name}",
                x.AreaId,
                x.TypeId,
                x.SpecialtyId,
                x.CreateAt,
                x.CreateBy,
                x.Active,
                x.Identification
            });

            return Json(new
            {
                items,
                totalCount = admissions.Count()
            });

        }      

        [HttpPost("api/admisions/post")]
        public IActionResult Post([FromBody] Admission admission) 
        {
            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La información del usuario cambio, inicie sesion nuevamente");

            if(user.AreaId != (int)AreaRestrict.Admision && user.AreaId != (int)AreaRestrict.Emergencia)
                return BadRequest("Solo se permite admisionar desde el area de admision");

            var existe = _db.Admissions.Any(x => x.BeneficiaryId == admission.BeneficiaryId && x.CreateAt > DateTime.Today && x.Active && x.TypeId == (int)AdmisionTypes.Consulta);
            
            if(existe && user.AreaId != (int)AreaRestrict.Admision)
                return BadRequest("El beneficiario ya tiene una admisión activa el dia de hoy");
            
            //TODO configurar el 3, parametrizar
            var countAdmisions = _db.Admissions.Where(x => x.BeneficiaryId == admission.BeneficiaryId && x.CreateAt > DateTime.Today && x.Active && x.TypeId == (int)AdmisionTypes.Consulta).Count();
            if(countAdmisions > 3)
                return BadRequest("El beneficiario ya tiene un maximo de 3 admisión activa el dia de hoy");

            var existeHops = _db.Admissions.Any(x => x.BeneficiaryId == admission.BeneficiaryId && x.TypeId == (int)AdmisionTypes.IngresoHops && !x.Finished && x.Active);
            if(existeHops)
                return BadRequest("El beneficiario ya tiene una admisión de ingreso activa");

            var bene = _db.Beneficiaries.FirstOrDefault(x => x.Id == admission.BeneficiaryId);

            var asegurado = _db.Customers.FirstOrDefault(x => x.Inss == bene.Inss);
            if(asegurado == null)
                return BadRequest($"No se encontró el asegurado con inss {bene.Inss} en el sistema");

            if(asegurado.CustomerStatusId == 2)
                return BadRequest($"El asegurado con inss {bene.Inss} ya no esta en el sistema");


            if(bene.RelationshipId == 2) //Hijo
                if( (bene.BirthDate - DateTime.Today).Days/365 >= 13)
                    return BadRequest("Solo se permiten admisiones para los hijos edad igual 13 años o menor");

            admission.Inss = bene.Inss;
            admission.Identification = bene.Identification;
            admission.Active = true;
            admission.NumberOfDay = getMaxAdmissionOfDay();
            admission.CreateAt = DateTime.Now;
            admission.CreateBy = user.Username;
            _db.Admissions.Add(admission);    

            var follow = new Follow{
                Admission = admission,
                AreaSourceId = user.AreaId,
                AreaTargetId = admission.AreaId,
                Observation = "Tranferencia automatica de admision",
                CreateAt = DateTime.Now,
                CreateBy = user.Username                
            };

            _db.Follows.Add(follow);

            _db.SaveChanges();

            return Json(admission);

        }      

        [HttpPost("api/admisions/puestomedico/post")]
        public IActionResult Post([FromBody] AdmissionModel admissionModel) 
        {
            var user = this.GetAppUser(_db);
            if(user == null)
                return BadRequest("La información del usuario cambio, inicie sesion nuevamente");

            var area = _db.Areas.FirstOrDefault(x => x.Id == admissionModel.AreaId);


            if(area  == null)
                return BadRequest($"No se encontro el area con el codigo {admissionModel.AreaId}");

            if(!area.Active)
                return BadRequest($"El area con codigo {admissionModel.AreaId} no esta activa");

            //if(area.TypeId != 3)
           //     return BadRequest($"El area seleccionada con codigo {admissionModel.AreaId} no es un puesto medico, sebe seleccionar un puesto medico o configurar el area como puesto medico");

            var admission = new Admission{
                CreateAt = admissionModel.Date,
                BeneficiaryId = admissionModel.BeneficiaryId,
                AreaId = admissionModel.AreaId,
                SpecialtyId = admissionModel.SpecialtyId,
                TypeId = 1,
                Observation = "Puesto medico"
            };

            var existe = _db.Admissions.Any(x => x.BeneficiaryId == admission.BeneficiaryId && x.CreateAt > admissionModel.Date.Date && x.Active && x.TypeId == (int)AdmisionTypes.Consulta);
            
            if(existe && user.AreaId != (int)AreaRestrict.Admision)
                return BadRequest("El beneficiario ya tiene una admisión activa el dia de hoy");
            
            //TODO configurar el 3, parametrizar
            var countAdmisions = _db.Admissions.Where(x => x.BeneficiaryId == admission.BeneficiaryId && x.CreateAt > admissionModel.Date.Date && x.Active && x.TypeId == (int)AdmisionTypes.Consulta).Count();
            if(countAdmisions > 3)
                return BadRequest("El beneficiario ya tiene un maximo de 3 admisión activa el dia de hoy");

            var existeHops = _db.Admissions.Any(x => x.BeneficiaryId == admission.BeneficiaryId && x.TypeId == (int)AdmisionTypes.IngresoHops && !x.Finished && x.Active);
            if(existeHops)
                return BadRequest("El beneficiario ya tiene una admisión de ingreso activa");

            var bene = _db.Beneficiaries.FirstOrDefault(x => x.Id == admission.BeneficiaryId);

            var asegurado = _db.Customers.FirstOrDefault(x => x.Inss == bene.Inss);
            if(asegurado == null)
                return BadRequest($"No se encontró el asegurado con inss {bene.Inss} en el sistema");

            if(asegurado.CustomerStatusId == 2)
                return BadRequest($"El asegurado con inss {bene.Inss} ya no esta en el sistema");

            if(bene.RelationshipId == 2) //Hijo
                if( (bene.BirthDate - DateTime.Today).Days/365 >= 13)
                    return BadRequest("Solo se permiten admisiones para los hijos edad igual 13 años o menor");

            admission.Inss = bene.Inss;
            admission.Identification = bene.Identification;
            admission.Active = true;
            admission.NumberOfDay = getMaxAdmissionOfDay();
            admission.CreateAt = DateTime.Now;
            admission.CreateBy = user.Username;            

            var follow = new Follow{

                Admission = admission,
                AreaSourceId = user.AreaId,
                AreaTargetId = admission.AreaId,
                Observation = "Tranferencia automatica de admision",
                CreateAt = DateTime.Now,
                CreateBy = user.Username          

            }; 
           

            var workOrder = new WorkOrder{
                Date = admissionModel.Date,
                DoctorId = admissionModel.DoctorId,
                Reference = admissionModel.Reference,
            };

            foreach (var item in admissionModel.WorkOrderDetailModels)
            {
                workOrder.WorkOrderDetails.Add(new WorkOrderDetail {
                    Costo = item.Costo,
                    Price = item.Price,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                });
            }

            workOrder.CreateBy = user.Username;

            follow.WorkOrders.Add(workOrder);

            admission.Follows.Add(follow);

            WorkOrderServices _service = new WorkOrderServices(_db);

            var result = _service.CreateFromAdmin(admission);
           
            if(!result.IsValid)
                return BadRequest(result.Error);            

            _db.SaveChanges();

            return Json(admission);

        }      


        [HttpGet("api/admisions/{id}/delete")]
        public IActionResult Delete(int id) {
            var admision = _db.Admissions.FirstOrDefault(x => x.Id == id);

            var follow = _db.Follows.Include(x => x.WorkOrders).Where(x => x.AdmissionId == id);
            foreach (var item in follow)
            {
                if(item.WorkOrders.Count > 0)
                return BadRequest("No se puede anular la admision porque ya tiene ordenes de trabajo");
            }


            if(admision != null)
            {
                admision.Active = false;
                _db.SaveChanges();
            }

            return Json(new { n = id });
        } 

        [HttpGet("api/admisions/{id}/alta")]
        public IActionResult Alta(int id) {

            var admision = _db.Admissions.FirstOrDefault(x => x.Id == id);

            if(admision != null)
            {
                admision.Finished = true;
                _db.SaveChanges();
            }

            return Json(new { n = id });
        } 

        [Route("api/admisions/get/{beneficiaryId}/last/{top}")]
        public IActionResult Get(int beneficiaryId, int top) 
        {
            IQueryable<Admission> admissions = _db.Admissions
            .Include(x => x.Area)
            .Include(x => x.Specialty)
            .Where(x => x.BeneficiaryId == beneficiaryId && x.Active)
            .OrderByDescending(x => x.CreateAt);
            
            var items = admissions.Take(top).Select(x => new {
                x.Id,
                x.NumberOfDay,
                x.Inss,
                Area = x.Area.Name,
                Especialidad = x.Specialty.Name,
                x.CreateAt,
                x.CreateBy,
                x.Active
            });

            return Json(items);

        }      

        private int getMaxAdmissionOfDay(){

            var max = _db.Admissions.Where(x => x.CreateAt > DateTime.Today)
            .OrderByDescending(x => x.NumberOfDay)
            .Select(x => x.NumberOfDay)
            .FirstOrDefault();
            
            return max + 1;
        }
    
    }
}
