using System.ComponentModel.DataAnnotations;

namespace AtencionClinica.ViewModel
{  

    public class AuthenticateRequest
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }

}