import moment from 'moment';
export const defaultFactura = {
    id: 0,
    formaPagoId: null,
    clienteId: null,
    fecha: new Date(moment().year(), moment().month(), moment().date(), 0, 0, 0, 0),
    estadoId: 1,
    plazoCredito: 0,
    subTotal: 0,
    descuento: 0,
    iva: 0,
    total: 0,
    observacion: '',
    tipoPagoId: null
}

export const defaultFacturasDetalle = {
    cantidad: 0,
    precio: 0,
    descuentoAverage: 0,
    importe: 0,
    inventarioId: 0,
    ivaAverage: 0.15,
    ivaMonto: 0,
    subTotal: 0,
    total: 0
}

// export const comprasDetalleInited = [{
//     inventarioId: 10,
//     cantidadSolicitada: 15,
//     costo: 10,
//     descuentoAverage: 0.1
// }, {
//     inventarioId: 22,
//     cantidadSolicitada: 20,
//     costo: 15,
//     descuentoAverage: 0
// }].map(x => {

//     x.subTotal = x.cantidadSolicitada * x.costo;
//     x.importe = x.subTotal - (x.subTotal * x.descuentoAverage);
//     x.iva = x.importe * 0.15;
//     x.total = x.importe + x.iva;

//     return x;
// });