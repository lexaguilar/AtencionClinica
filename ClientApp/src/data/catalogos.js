const catalogos = [{
    name : 'areas',
    url : 'areas'
},{
    name : 'especialidades',
    url : 'especialidades'
},{
    name : 'familias',
    url : 'familias'
},{
    name : 'presentaciones',
    url : 'presentaciones',
    caption :'Laboratorio'
},{
    name : 'unidadmedida',
    caption : 'Unidad de Medida',
    url : 'ums'
},{
    name : 'tipo-convenio',
    caption : 'Tipo de convenio',
    url : 'contracts'
}];

const estadoGeneric = {
    activo: 1,
    noActivo: 2
}

export const relationships = {
    asegurado: 1,
    hijo: 2
}

export const tipoMovimiento = { entrada: 1, salida: 2 }

export const estadoAdmision = {...estadoGeneric};

export const estadoCustomer = {...estadoGeneric};

export const estadoBeneficiario = {...estadoGeneric};

export const inPutProductStates = {...estadoGeneric};

export const outPutProductStates = {...estadoGeneric};

export const monedaSymbol = {
    1: "C$",
    2: "$"
}

export const inPutProductTypes = { compra: 1, ajusteEntrada: 2, saldoInicial : 3, traslado : 4 }
export const outPutProductTypes = { facturacion: 1, ajuste: 2, servicios : 3, traslado : 4 }

export const typeTraslate = {
    create: 'create',
    update: 'update'
}

export const stagesTraslate = {
    pendiente: 1,
    anulado: 2,
    procesado: 3
}

export default catalogos;