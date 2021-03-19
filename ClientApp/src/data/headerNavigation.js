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
            { title: 'Expediente clinico', url: `${_path.CLINICA}/servicios/expediente` },           
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
                        { title: 'Presentaciones', url: `${_path.CLINICA}/presentaciones` },
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
                        { title: 'Perfiles', url: `${_path.CLINICA}/perfiles/procedimientos` }
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
                        { title: 'Beneficiarios', url: `${_path.CLINICA}/beneficiarios` },
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