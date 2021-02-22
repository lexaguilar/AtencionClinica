using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using AtencionClinica.Models;

namespace AtencionClinica.ViewModel
{  

    public class AuthenticateResponse
    {
        public string Nombre { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
        public string Area { get; set; }
        public int AreaId { get; set; }
        public DateTime ExpireAt { get; set; }
        public RolResourcesViewModel[] Resources { get; set; }


        public AuthenticateResponse(User user, string token)
        {
            Nombre = user.FullName;
            Username = user.Username;
            Token = token;
            AreaId = user.AreaId;
            Area = user.Area.Name;
            ExpireAt = DateTime.UtcNow.AddDays(7);
            Resources = user.Rol.RolResources.Select(x => new RolResourcesViewModel 
            {
                Resource = x.ResourceId,
                Action = x.Action
            }).ToArray();
        }
    }

    public class RolResourcesViewModel
    {
        public int Resource { get; set; }
        public int Action { get; set; }
    }

}