const catalogos = [ 'actividades' ];

const estadoGeneric = {
    elaborado: 1,
    anulado: 2
}

export const estadoSalida = {...estadoGeneric };

export const estadoEntrada = {...estadoGeneric }; 

export const estadoServicio = {...estadoGeneric }; 

export const estadoCompra = {...estadoGeneric };

export const etapaCompra = {...estadoGeneric, ... { recibida: 2 } };

export const formaPago = { contado: 1, credito: 2 }

export const tipoMovimiento = { entrada: 1, salida: 2 }

export const monedaSymbol = {
    1: "C$",
    2: "$"
}

export default catalogos;