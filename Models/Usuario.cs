using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Usuario
    {
        public string Username { get; set; }
        public string Nombre { get; set; }
        public string Correo { get; set; }
        public string PasswordCifrada { get; set; }
        public int RolId { get; set; }

        public virtual Role Rol { get; set; }
    }
}
