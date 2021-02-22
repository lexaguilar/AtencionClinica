using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AtencionClinica.Models;
using AtencionClinica.Services;
using AtencionClinica.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace AtencionClinica.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : ControllerBase
    {
        private readonly ClinicaContext _db = null;

        public RolesController(ClinicaContext db)
        {
            this._db = db;

        }

        // GET: api/<UsersManagementController>
        [HttpGet("[action]")]
        public IActionResult Get()
        {
            var r = _db.Rols.ToArray();
            return new JsonResult(r);

        }
        [HttpPost("[action]")]
        public IActionResult Post(Rol m)
        {


            var reg = _db.Rols.FirstOrDefault(x => x.Name == m.Name);
            if (reg == null)
            {
                reg = new Rol { Name = m.Name };
                _db.Rols.Add(reg);
                foreach (var r in _db.Resources.Select(x => x.Id))
                    reg.RolResources.Add(new RolResource { ResourceId = r });
                _db.SaveChanges();
            }
            return new JsonResult(reg);
        }


        // GET: api/<UsersManagementController>
        [HttpGet("{roleId}/[action]")]
        public IActionResult Resources(int roleId)
        {
            var r = _db.RolResources.Where(x => x.RolId == roleId).Select(x => new ResourceModel { ResourceId = x.ResourceId, Name = x.Resource.Name, Action = (Action)x.Action }).ToArray();
            return new JsonResult(r);

        }

        [HttpPost("{roleId}/[action]")]
        public IActionResult Resources(int roleId, [FromBody] ResourceModel m)
        {
            var r = _db.RolResources.FirstOrDefault(x => x.RolId == roleId && x.ResourceId == m.ResourceId);
            if (r != null)
            {
                r.Action = (int)m.ComputeAction();
                int n = _db.SaveChanges();
            }
            return new JsonResult(m);

        }

    }
}
