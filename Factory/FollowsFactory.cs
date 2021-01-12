using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AtencionClinica.Factory
{  
    public class FollowsFactory 
    {      
        private readonly ClinicaContext db;
        public FollowsFactory(ClinicaContext _db){
            db = _db;
        }

        public int Add(int areaSourceId, int areaTargetId){

           return 0;

        }
    }
}