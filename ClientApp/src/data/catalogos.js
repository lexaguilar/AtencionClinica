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
    url : 'presentaciones'
},{
    name : 'unidadmedida',
    caption : 'Unidad de Medida',
    url : 'ums'
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

export const monedaSymbol = {
    1: "C$",
    2: "$"
}

export default catalogos;