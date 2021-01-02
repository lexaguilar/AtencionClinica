using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Rol
    {
        public Rol()
        {
            RolResources = new HashSet<RolResource>();
            Users = new HashSet<User>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<RolResource> RolResources { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
