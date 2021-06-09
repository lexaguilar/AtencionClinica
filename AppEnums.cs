using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AtencionClinica
{    
    public enum InputType { Compras = 1, AjusteEntrada = 2, SaldoInicial = 3, Traslado = 4, Conversion = 5 }
    public enum OutputType { Facturacion = 1, AjusteSalida = 2, FarmaciaServicios = 3, Traslado = 4, Hemodialisis = 6, Conversion = 7 }
    public enum AreaRestrict { Bodega = 1, Admision = 2, Laboratorio, Farmacia = 7, Emergencia = 8}
    public enum Roles {None, Administrador }
    public enum ClientType { Private = 1, Contract = 2 }
    public enum AdmisionTypes { Consulta = 1, IngresoHops = 2 }
    public enum BillTypes { FacturaIngreso = 1, Expontanea = 2 }
    public enum PrivateCustomers { ClienteContado = 1 }
    public enum TraslateStages { Pendiente = 1, Anulado = 2, Procesado = 3 }

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
