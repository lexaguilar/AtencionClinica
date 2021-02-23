using System.Linq;
using AtencionClinica.Models;
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

        public User Auth(string username, string password)
        {
            var pass = password.GetPasswordHashedSHA256();

            //TODO : agregar condicion de la pass
            var result = db.Users.Include(x => x.Area)
            .Include(x => x.Rol)
            .ThenInclude(x => x.RolResources)
            .FirstOrDefault(x => x.Username == username && x.Password == pass && x.Active);
            
            return result;
        }

        
    }
}