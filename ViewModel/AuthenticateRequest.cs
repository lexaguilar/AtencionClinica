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

    public class ChangePasswordRequest
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string OldPassword { get; set; }
        [Required]
        public string NewPassword { get; set; }
        [Required]
        public string RepeatPassword { get; set; }
    }

}