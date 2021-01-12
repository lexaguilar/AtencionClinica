using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Role
    {
        public Role()
        {
            RolRecursos = new HashSet<RolRecurso>();
            Usuarios = new HashSet<Usuario>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }

        public virtual ICollection<RolRecurso> RolRecursos { get; set; }
        public virtual ICollection<Usuario> Usuarios { get; set; }
    }
}
