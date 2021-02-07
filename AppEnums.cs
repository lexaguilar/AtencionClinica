using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AtencionClinica
{   
    public enum Roles {None, Administrador }

    public enum Resource { Ninguno, Usuarios, Catalogos, Facturacion, Clientes, Agenda, Inventario, Graduaciones, SMS }
    [Flags]
    public enum Action
    {
        None=0x0,
        Create = 0x2,
        Read = 0x1,
        Update = 0x4,
        Delete = 0x8
    }


}
