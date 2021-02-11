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
using Microsoft.Extensions.Options;

namespace AtencionClinica.Controllers
{  
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {      
        
        private ClinicaContext _db = null;
        private readonly AppSettings _appSettings;
        public UsersController(ClinicaContext db, IOptions<AppSettings> appSettings)
        {
            this._db = db;
            this._appSettings = appSettings.Value;
        }

        [HttpGet("[action]")]
        public IActionResult Get(int skip, int take)
        {

            
            var items = _db.Users.Select(x => new { x.Username, x.Email, x.FullName, x.RolId, x.AreaId }).Skip(skip).Take(take != 0 ? take : 10).ToArray();
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
                user.Username = user.Email.Split("@")[0];
                user.ToUpperCase();
                _db.Users.Add(user);
                user.Password = UserHelpers.GetPasswordHashedSHA256(_appSettings.PassWord);
                dbusr = user;
            }
            else
            {
                dbusr.CopyFrom(user, x => new { x.AreaId, x.Email, x.FullName });
            }
            _db.SaveChanges();
            dbusr.Password = null;
            return new JsonResult(user);

        }

    }
}
