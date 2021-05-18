using System;
using System.Collections.Generic;
using System.Linq;
using AtencionClinica.Factory;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace AtencionClinica.Controllers
{  
    [Authorize]
    public class GroupsController : Controller
    {      
        private GenericFactory<Group> factory = null;
        public GroupsController(ClinicaContext db)
        {
            this.factory = new GenericFactory<Group>(db);
        }

        [Route("api/groups/get")]
        public IActionResult Get(){            
            
            return Json(factory.GetAll());
            
        } 

        [HttpPost("api/groups/post")]
        public IActionResult Post([FromBody] Group group)
        {
            group.ToUpperCase();
            factory.InsertOrUpdateAndSave(group, x => x.Id == group.Id );
            return Json(group);

        }     

    
    }
}
