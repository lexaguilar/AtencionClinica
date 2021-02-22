using System;
using System.Security.Claims;
using AtencionClinica.Services;
using Microsoft.AspNetCore.Mvc;

namespace AtencionClinica.Extensions
{
    public static class ControllerExtensions
    {
        internal static AppUser GetAppUser(this Controller controller)
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
                    }
                }
            }

            return usr;
        }
    }
}