export const _path = {
    CLINICA: '/clinica',    
    ACCOUNT : '/account'
}

const menu = [{
    layout: 'clinica',
    title: 'Caja',
    url: `${_path.CLINICA}/facturas`,
    submenu: {
        type: 'menu',
        menu: [
            { title: 'Nueva', url: `${_path.CLINICA}/facturas/nuevo` },
            { title: 'Factura rapida', url: `${_path.CLINICA}/facturas/nuevo-quickly` },
            { title: 'Facturas', url: `${_path.CLINICA}/facturas` },
            { 
                title: 'Reportes', 
                url: ``,
                submenu : [
                    { title: 'Reporte 1', url: `${_path.CLINICA}/admision/reportes/1` },
                    { title: 'Reporte 2', url: `${_path.CLINICA}/admision/reportes/2` },
                ]
            },   
        ],
    },
},{
    layout: 'clinica',
    title: 'Admision',
    url: `${_path.CLINICA}/admisiones`,
    submenu: {
        type: 'menu',
        menu: [
            { title: 'Nueva', url: `${_path.CLINICA}/admisiones/nuevo` },
            { title: 'Admisiones', url: `${_path.CLINICA}/admisiones` },            
            { 
                title: 'Reportes', 
                url: ``,
                submenu : [
                    { title: 'Reporte 1', url: `${_path.CLINICA}/admision/reportes/1` },
                    { title: 'Reporte 2', url: `${_path.CLINICA}/admision/reportes/2` },
                ]
            },   
        ],
    },
},{
    layout: 'clinica',
    title: 'Citas',
    url: `${_path.CLINICA}/citas`,
    submenu: {
        type: 'menu',
        menu: [
            { title: 'Nueva', url: `${_path.CLINICA}/citas/nuevo` },
            { title: 'Citas', url: `${_path.CLINICA}/citas` },
            { 
                title: 'Reportes', 
                url: ``,
                submenu : [
                    { title: 'Reporte 1', url: `${_path.CLINICA}/citas/reportes/1` },
                    { title: 'Reporte 2', url: `${_path.CLINICA}/citas/reportes/2` },
                ]
            },   
        ],
    },
},{
    layout: 'clinica',
    title: 'Servicios',
    url: `${_path.CLINICA}/servicios`,
    submenu: {
        type: 'menu',
        menu: [
            { title: 'Asegurados', url: `${_path.CLINICA}/servicios` },
            { title: 'Privados y convenios', url: `${_path.CLINICA}/servicios-privados` },           
            { title: 'Admisiones de hoy', url: `${_path.CLINICA}/admisiones-hoy` },           
            { title: 'Expediente Pte Inss', url: `${_path.CLINICA}/servicios/expediente` },           
            { title: 'Expediente Pte Privado', url: `${_path.CLINICA}/servicios/expediente-privado` },           
        ],
    },
},{
    layout: 'clinica',
    title: 'Subsidios',
    url: `${_path.CLINICA}/subsidios`
},{
    layout: 'clinica',
    title: 'Inventario',
    url: `${_path.CLINICA}/productos`,
    submenu: {
        type: 'megamenu',
        menu: {
            size: 'nl',
            columns: [{
                size: 6,
                links: [{
                    title: 'Entradas',
                    url: '',
                    links: [
                        { title: 'Ajuste de entrada', url: `${_path.CLINICA}/movimientos/entradas` },    
                        { title: 'Traslados o requisas', url: `${_path.CLINICA}/movimientos/traslados` },    
                        { title: 'Compras', url: `${_path.CLINICA}/movimientos/compras` },
                        { title: 'Inventario Inicial', url: `${_path.CLINICA}/movimientos/inv-inicial` },
                    ],
                },]
            },{
                size: 6,
                links: [{
                    title: 'Salidas',
                    url: '',
                    links: [
                        { title: 'Ajuste de salida', url: `${_path.CLINICA}/movimientos/salidas` },
                        { title: 'Despacho', url: `${_path.CLINICA}/movimientos/despacho` },    
                    ],
                },]
            },{
                size: 6,
                links: [{
                    title: 'Catalogo',
                    url: '',
                    links: [
                        { title: 'Productos', url: `${_path.CLINICA}/productos` },           
                        { title: 'Familias', url: `${_path.CLINICA}/familias` },
                        { title: 'Laboratorios', url: `${_path.CLINICA}/presentaciones` },
                        { title: 'Unidad Medida', url: `${_path.CLINICA}/unidadmedida` },
                        { title: 'Proveedores', url: `${_path.CLINICA}/proveedores` },
                        { title: 'Tasa de cambio', url: `${_path.CLINICA}/tasa-de-cambio` },
                    ],
                },]
            },{
                size: 6,
                links: [{
                    title: 'Reportes',
                    url: '',
                    links: [
                        { title: 'Kardex', url: `${_path.CLINICA}/inventario/reportes/kardex` },
                        { title: 'Existencias', url: `${_path.CLINICA}/inventario/reportes/existencias` },
                        { title: 'Stock', url: `${_path.CLINICA}/inventario/reportes/stock` },
                    ],
                },]
            }]
        }

    },
},{
    layout: 'clinica',
    title: 'Puestos Médicos',
    url: `${_path.CLINICA}/puestos-medicos` ,
},{
    layout: 'clinica',
    title: 'Ficheros',
    url: ``,
    submenu: {
        type: 'megamenu',
        menu: {
            size: 'nl',
            columns: [{
                size: 6,
                links: [{
                    title: 'Procedimientos',
                    url: '',
                    links: [
                        { title: 'Procedimientos', url: `${_path.CLINICA}/procedimientos` },
                        { title: 'Procedimientos por area', url: `${_path.CLINICA}/area/procedimientos` },
                        { title: 'Detalle de procedimientos', url: `${_path.CLINICA}/procedimientos/detalle` },
                        { title: 'Estandar', url: `${_path.CLINICA}/procedimientos/estandar` }
                    ],
                },]
            },{
                size: 6,
                links: [{
                    title: 'Asegurados',
                    url: '',
                    links: [
                        { title: 'Percapita', url: `${_path.CLINICA}/config/percapitas` },
                        { title: 'Asegurados', url: `${_path.CLINICA}/asegurados/activos` },
                        { title: 'Beneficiarios por asegurado', url: `${_path.CLINICA}/beneficiarios` },
                        { title: 'Beneficiarios', url: `${_path.CLINICA}/beneficiariosall` },
                        { title: 'Privados y convenios', url: `${_path.CLINICA}/privados` },
                    ],
                },]
            },{
                size: 6,
                links: [{
                    title: 'Configuraciones',
                    url: '',
                    links: [
                        { title: 'Areas', url: `${_path.CLINICA}/areas` },
                        { title: 'Doctores', url: `${_path.CLINICA}/doctores` },
                        { title: 'Doctores Horario', url: `${_path.CLINICA}/doctores/horarios` },
                        { title: 'Especialidades', url: `${_path.CLINICA}/especialidades` },
                        { title: 'Tipo de convenios', url: `${_path.CLINICA}/tipo-convenio` },
                    ],
                },]
            },{
                size: 6,
                links: [{
                    title: 'Hemodialisis',
                    url: '',
                    links: [
                        { title: 'Grupos', url: `${_path.CLINICA}/grupos` },
                        { title: 'Medicamentos por grupo', url: `${_path.CLINICA}/grupo-medicamentos` },
                        { title: 'Calendario', url: `${_path.CLINICA}/grupo-calendario` },
                        { title: 'Programar Hemodialisis', url: `${_path.CLINICA}/grupo-hemo` },
                        { title: 'Descargue Hemodialisis', url: `${_path.CLINICA}/hemo-products` },
                    ],
                },]
            }]
        }

    },
},{
    layout: 'clinica',
    title: 'Configuración',
    url: `${_path.CLINICA}/usuarios` ,
    submenu: {
        type: 'menu',
        menu: [
            { title: 'Usuarios', url: `${_path.CLINICA}/usuarios` },
            { title: 'Roles', url: `${_path.CLINICA}/roles` },
            { title: 'Recursos', url: `${_path.CLINICA}/permisos` },
            { title: 'Parametros', url: `${_path.CLINICA}/config/parameters` }
        ],
    },
}];


export default menu;