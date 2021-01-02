using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class RolResource
    {
        public int Id { get; set; }
        public int RolId { get; set; }
        public int ResourceId { get; set; }

        public virtual Resource Resource { get; set; }
        public virtual Rol Rol { get; set; }
    }
}
