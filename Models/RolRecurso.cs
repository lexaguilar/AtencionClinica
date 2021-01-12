using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class RolRecurso
    {
        public int Id { get; set; }
        public int RolId { get; set; }
        public int RecursoId { get; set; }

        public virtual Recurso Recurso { get; set; }
        public virtual Role Rol { get; set; }
    }
}
