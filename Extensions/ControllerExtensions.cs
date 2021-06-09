using System;
using System.Linq;
using System.Security.Claims;
using AtencionClinica.Models;
using AtencionClinica.Services;
using Microsoft.AspNetCore.Mvc;

namespace AtencionClinica.Extensions
{
    public static class ControllerExtensions
    {
        internal static AppUser GetAppUser(this Controller controller, ClinicaContext db)
        {
            AppUser usr = new AppUser();
            var identity = controller.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                foreach (var c in identity.Claims)
                {
                    switch (c.Type)
                    {
                        case ClaimTypes.NameIdentifier:
                            usr.Username = c.Value;
                            break;                    
                        case AppClaimTypes.AreaId:
                            usr.AreaId = Convert.ToInt32(c.Value);
                            break;
                        case AppClaimTypes.RolId:
                            usr.RolId = Convert.ToInt32(c.Value);
                            break;
                    }
                }
            }

            var user = db.Users.FirstOrDefault(x => x.Username == usr.Username);

            if(user.AreaId != usr.AreaId || user.RolId != usr.RolId)
                return null;

            return usr;
        }
    }
}