
using AtencionClinica.Factory;
using AtencionClinica.Models;
using AtencionClinica.ViewModel;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;


namespace AtencionClinica.Services
{
    public class AppClaimTypes
    {
        internal const string AreaId = "AreaId";
        internal const string RolId = "RolId";
    }
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        User ChangePassword(ChangePasswordRequest model);
        User ResetPassword(RestPasswordRequest model, bool isResetDefault);
        User GetById(string username);
    }

    public class UserService : IUserService
    {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications


        private readonly AppSettings _appSettings;
        private readonly ClinicaContext _db;
        private readonly UserFactory userFactory = null;
        private readonly IEmailService _emailService= null;

        public UserService(IOptions<AppSettings> appSettings, ClinicaContext db, IEmailService emailService)
        {
            _appSettings = appSettings.Value;
            _db = db;
            userFactory = new UserFactory(_db);
            _emailService = emailService;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = userFactory.Auth(model.Username, model.Password);

            // return null if user not found
            if (user == null) return null;

            // authentication successful so generate jwt token
            var hours = _appSettings.Hours;
            var token = generateJwtToken(user, hours);

            return new AuthenticateResponse(user, token);
        }


        public User GetById(string username)
        {
            return userFactory.GetById(username);
        }

        // helper methods

        private string generateJwtToken(User user, double time)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = CreateClaims(user),
                Expires = DateTime.UtcNow.AddHours(time),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private ClaimsIdentity CreateClaims(User user)
        {
            //Crear identidad principal
            var identity = new ClaimsIdentity(new[] { new Claim(ClaimTypes.NameIdentifier, user.Username) });

            //Agregar resursos
            identity.AddClaim(new Claim(AppClaimTypes.AreaId, user.AreaId.ToString()));
            identity.AddClaim(new Claim(AppClaimTypes.RolId, user.RolId.ToString()));

            return identity;
        }

        public User ChangePassword(ChangePasswordRequest model)
        {

            var user = userFactory.ChangePassword(model);

            if (user == null) return null;

            return user;

        }

        public User ResetPassword(RestPasswordRequest model, bool isResetDefault)
        {
            var user = userFactory.GetByIdOrEmail(model.Username);
            if (user == null) return null;

            var newPassword = string.Empty;

            if(isResetDefault)
                newPassword = _appSettings.PassWord;
            else
                newPassword = CreatePassword(8);

            user.Password = UserHelpers.GetPasswordHashedSHA256(newPassword);

            userFactory.Save();

            if(!isResetDefault){
                var mail = new MailMessage(_appSettings.From, user.Email);

                mail.Subject = "Restablecer contraseña.";
                mail.Body = $"Estimado usuario se ha restablecido su contraseña, favor ingresar al sistema con su usuario {user.Username} y la nueva contraseña {newPassword}";

                _emailService.SendEmailAsync(mail);
            }

            return user;

        }

        public string CreatePassword(int length)
        {
            const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            StringBuilder res = new StringBuilder();
            Random rnd = new Random();
            while (0 < length--)
            {
                res.Append(valid[rnd.Next(valid.Length)]);
            }
            return res.ToString();
        }
    }
}