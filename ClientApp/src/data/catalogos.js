const catalogos = [{
    name: 'especialidades',
    url: 'especialidades'
}, {
    name: 'familias',
    url: 'familias'
}, {
    name: 'presentaciones',
    url: 'presentaciones',
    caption: 'Laboratorio'
}, {
    name: 'unidadmedida',
    caption: 'Unidad de Medida',
    url: 'ums'
}, {
    name: 'tipo-convenio',
    caption: 'Tipo de convenio',
    url: 'contracts'
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

export const estadoAdmision = { ...estadoGeneric };

export const typeAdmision = { consulta: 1, Hospitalizacion: 2 };

export const estadoCustomer = { ...estadoGeneric };

export const estadoBeneficiario = { ...estadoGeneric };

export const inPutProductStates = { ...estadoGeneric };

export const outPutProductStates = { ...estadoGeneric };

export const monedaSymbol = {
    1: "C$",
    2: "$"
}

export const inPutProductTypes = { compra: 1, ajusteEntrada: 2, saldoInicial: 3, traslado: 4 }
export const outPutProductTypes = { facturacion: 1, ajuste: 2, servicios: 3, traslado: 4 }

export const typeTraslate = {
    create: 'create',
    update: 'update'
}

export const appearanceBio = [
    'SALIVA'
    , 'BIOPSIA'
    , 'LIQUIDO PERICARDICO'
    , 'BAAR DE EXUDADO TORAXICO'
    , 'BIOPSIA BRONQUIAL'
    , 'ORINA'
    , 'LIQUIDO PLEURAL '
    , 'LIQUIDO SINOVIAL'
    , 'LAVADO BRONQUIAL'
    , 'LAVADO BRAQUIAL'
    , 'ESPUTO'
]
export const appearance = [
    'SECRECION'
    ,'TURBIO'
    ,'SALIVA'
    , 'SANGUINOLENTO'
    , 'HEMOTOICA'
    , 'TRANSPARENTE'
    , 'MUCOIDE'
    , 'SANGUINOLENTO'
    , 'HEMOPTOICA'
    , 'MUCO PURULENTA'
    , 'LIQUIDO PERICARDICO'
    , 'ASPIRADO BRONQUIAL'
    , 'HEMOPTOICO '
    , 'BIOPSIA BRONQUIAL'
    , 'MUCOPURULENTO '
    , 'LIQUIDO PLEURAL '
    , 'LIGERO TURBIO'
    , 'MUCOPUROLENTO'
    , 'ESPUTO'
]
export const observationBK = [
   'Ausencia BK en 100 campos'
]


export const testAntiBiotics = ['Acido Nalidixico'
,'Amikacina'
,'Amoxicilina'
,'Amoxicilina / Acido Clavulánico'
,'Ampicilina'
,'Ampicilina/Sulbactam'
,'Azitromicina'
,'Aztreonan'
,'Bacitracina'
,'Carbenicilina'
,'Cefaclor'
,'Cefadroxilo'
,'Cefalexina'
,'Cefalotina'
,'Cefixime'
,'Cefotaxime'
,'Cefoxitina'
,'Ceftazidima'
,'Ceftriaxone'
,'Ciprofloxacina'
,'Clindamicina'
,'Cloranfenicol'
,'colistin'
,'Cotrimoxazol'
,'Dicloxacilina'
,'Doxiciclina'
,'Eritromicina'
,'Ertapenem'
,'Fosfomicina'
,'Gentamicina'
,'Imipenem'
,'Levofloxacina'
,'LINEZOLID'
,'Meropenem'
,'Nitrofurantoina'
,'Norfloxacina'
,'Oxacilina'
,'Penicilina'
,'Piperacilina'
,'Piperacilina tazobactam'
,'Rifampicina'
,'Tetraciclina'
,'Trimetropin Sulfa'
,'Vancomicina'];

export const testFrescs = ['SIN MUESTRA'
,'NO SE OBSERVO'
,'CELULAS EPITELIALES'
,'LEVADURAS'
,'TRICOMONAS VAGINALES'
,'0-1 X CAMPO'
,'LEUCOCITOS'
,'POCAS'
,'1-2 X CAMPO'
,'BACTERIAS'
,'ERITROCITOS'
,'ESCASAS'];


export const stagesTraslate = {
    pendiente: 1,
    anulado: 2,
    procesado: 3,
    autorizado: 4,
}

export default catalogos;