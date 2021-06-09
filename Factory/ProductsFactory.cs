using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AtencionClinica.Factory
{  
    public class ProductsFactory 
    {      
        private readonly ClinicaContext _db;
        public ProductsFactory(ClinicaContext db){
            _db = db;
        }

        public VwProductInfo[] GetByArea(int areaId, bool active, bool exists,bool has)
        {

            var result = _db.VwProductInfos.Where(x => x.AreaId == areaId);

            if (active)
                result = result.Where(x => x.StateId == 1);

            if (exists)
                result = result.Where(x => x.Exists);

            if(has)
                result = result.Where(x => x.Stock > 0);

            return result.ToArray();

        }
    }
}