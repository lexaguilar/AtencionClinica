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
                return BadRequest("Username or password is incorrect");

            return Ok(response);
        }
    }
}
