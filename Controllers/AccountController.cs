using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AtencionClinica.Models;
using AtencionClinica.Services;
using AtencionClinica.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace AtencionClinica.Controllers
{
    [AllowAnonymous]
    public class AccountController : Controller
    {
        private readonly ClinicaContext db = null;
        private IUserService _userService;

        public AccountController(ClinicaContext _db, IUserService userService)
        {
            this.db = _db;
            _userService = userService;
        }

        [HttpPost("api/account/auth")]
        public IActionResult Auth([FromBody] AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest("El usario o contraseña es incorrecta");

            return Ok(response);
        }

        [HttpPost("api/account/changepassword")]
        public IActionResult ChangePassword([FromBody] ChangePasswordRequest model)
        {

            if(model.NewPassword != model.RepeatPassword)
                return BadRequest("Las nuevas contraseñas no coninciden");

            if(model.NewPassword.Length < 5)
                return BadRequest("La nueva contraseña debe tener al menos 5 caracteres");

            var user = _userService.ChangePassword(model);

            if (user == null)
                return BadRequest("El usario o contraseña es incorrecta");

            return Ok(user);
        }
    }
}
