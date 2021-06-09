using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AtencionClinica.Factory
{  
    public class ServicesFactory 
    {      
        private readonly ClinicaContext _db;
        public ServicesFactory(ClinicaContext db){
            _db = db;
        }

        public Service[] GetByArea(int areaId, bool active)
        {
            IQueryable<AreaService> result = _db.AreaServices.Include(x => x.Service).Where(x => x.AreaId == areaId);
            
            if(active)
                result = result.Where(x => x.Service.Active);
           
            return result.Select(x => x.Service).ToArray();

        }
    }
}