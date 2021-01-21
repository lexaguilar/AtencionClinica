using System.ComponentModel.DataAnnotations;
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


        public AuthenticateResponse(User user, string token)
        {
            Nombre = user.FullName;
            Username = user.Username;
            Token = token;
            AreaId = user.AreaId;
            Area = user.Area.Name;
        }
    }

}