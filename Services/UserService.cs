
using AtencionClinica.Factory;
using AtencionClinica.Models;
using AtencionClinica.ViewModel;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;


namespace AtencionClinica.Services
{
     public class AppClaimTypes
    {
        internal const string AreaId = "AreaId";
    }
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        User GetById(string username);
    }

    public class UserService : IUserService
    {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications


        private readonly AppSettings _appSettings;
         private readonly ClinicaContext _db;
         private readonly UserFactory userFactory = null;

        public UserService(IOptions<AppSettings> appSettings, ClinicaContext db)
        {
            _appSettings = appSettings.Value;
            _db = db;
            userFactory = new UserFactory(_db);
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

            return identity;
        }
    }
}