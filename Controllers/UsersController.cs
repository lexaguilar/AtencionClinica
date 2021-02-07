using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AtencionClinica.Extensions;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace AtencionClinica.Controllers
{  
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {      
        
        private ClinicaContext _db = null;
        public UsersController(ClinicaContext db)
        {
            this._db = db;
        }

        [HttpGet("[action]")]
        public IActionResult Get(int skip, int take)
        {

            
            var items = _db.Users.Select(x => new { x.Username, x.Email, x.FullName, x.RolId }).Skip(skip).Take(take != 0 ? take : 10).ToArray();
            return new JsonResult(new
            {
                items,
                totalCount = items.Count()
            });
        }
        [HttpPost("[action]")]
        public IActionResult Post([FromBody] User user)
        {
            
            var dbusr=_db.Users.FirstOrDefault(x => x.Username == user.Username);
            if(dbusr==null)
            {
                _db.Users.Add(user);
                string pwd = UserHelpers.GenerateRndPwd();
                user.Password = UserHelpers.GetPasswordHashedSHA256(pwd);
                dbusr = user;
            }
            else
            {
                dbusr.CopyFrom(user, x => new { x.Password });
            }
            _db.SaveChanges();
            dbusr.Password = null;
            return new JsonResult(user);

        }

    }
}
