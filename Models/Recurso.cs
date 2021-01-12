using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Recurso
    {
        public Recurso()
        {
            RolRecursos = new HashSet<RolRecurso>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }

        public virtual ICollection<RolRecurso> RolRecursos { get; set; }
    }
}
