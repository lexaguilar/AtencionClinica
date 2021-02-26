using System.Linq;
using AtencionClinica.Models;
using AtencionClinica.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace AtencionClinica.Factory
{
    public class UserFactory
    {
        private ClinicaContext db = null;       

        public UserFactory(ClinicaContext _db)
        {
            this.db = _db;
        }

        public User GetById(string username){
            return db.Users.FirstOrDefault(x => x.Username == username);
        }       
        public User GetByIdOrEmail(string username){
            return db.Users.FirstOrDefault(x => x.Username == username || x.Email == username);
        }       

        public User Auth(string username, string password)
        {
            var pass = password.GetPasswordHashedSHA256();

            var result = db.Users.Include(x => x.Area)
            .Include(x => x.Rol)
            .ThenInclude(x => x.RolResources)
            .FirstOrDefault(x => x.Username == username && x.Password == pass && x.Active);
            
            return result;
        }

        public User ChangePassword(ChangePasswordRequest model)
        {
            var pass = model.OldPassword.GetPasswordHashedSHA256();
            
            var result = db.Users.FirstOrDefault(x => x.Username == model.Username && x.Password == pass && x.Active);

            if(result == null)
                return null;

            var newPass = model.NewPassword.GetPasswordHashedSHA256();
            result.Password = newPass;

            db.SaveChanges();
            
            return result;
        }

        public void Save() => db.SaveChanges();

        
    }
}