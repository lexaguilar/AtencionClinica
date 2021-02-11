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
            { title: 'Privados', url: `${_path.CLINICA}/servicios-privados` },           
        ],
    },
},{
    layout: 'clinica',
    title: 'Subsidios',
    url: `${_path.CLINICA}/subsidios`
},{
//     layout: 'clinica',
//     title: 'Inventario',
//     url: `${_path.CLINICA}/productos`,
//     submenu: {
//         type: 'menu',
//         menu: [
//             { title: 'Productos', url: `${_path.CLINICA}/productos` },           
//             { title: 'Familias', url: `${_path.CLINICA}/familias` },
//             { title: 'Presentaciones', url: `${_path.CLINICA}/presentaciones` },
//             { title: 'Unidad Medida', url: `${_path.CLINICA}/unidadmedida` },
//             { 
//                 title: 'Movimientos', 
//                 url: `${_path.CLINICA}/movimientos`,
//                 submenu : [
//                     { title: 'Entradas', url: `${_path.CLINICA}/movimientos/entradas` },           
//                     { title: 'Salidas', url: `${_path.CLINICA}/movimientos/salidas` },
//                     { title: 'Compras', url: `${_path.CLINICA}/movimientos/compras` },
//                     { title: 'Requisas', url: `${_path.CLINICA}/movimientos/requisas` },
//                     { title: 'Inventario Inicial', url: `${_path.CLINICA}/movimientos/inv-inicial` },
//                 ]
//             },
//             { 
//                 title: 'Reportes', 
//                 url: ``,
//                 submenu : [
//                     { title: 'Kardex', url: `${_path.CLINICA}/inventario/reportes/karex` },
//                     { title: 'Existencias', url: `${_path.CLINICA}/inventario/reportes/karex` },
//                 ]
//             },   
//         ],
//     },
// },{
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
                        { title: 'Momivientos de entrada', url: `${_path.CLINICA}/movimientos/entradas` },    
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
                        { title: 'Momivientos de salida', url: `${_path.CLINICA}/movimientos/salidas` },
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
                        { title: 'Tasa de cambio', url: `${_path.CLINICA}/tasa-de-cambio` },
                    ],
                },]
            },{
                size: 6,
                links: [{
                    title: 'Reportes',
                    url: '',
                    links: [
                        { title: 'Kardex', url: `${_path.CLINICA}/inventario/reportes/karex` },
                        { title: 'Existencias', url: `${_path.CLINICA}/inventario/reportes/karex` },
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
                        { title: 'Beneficiarios', url: `${_path.CLINICA}/beneficiarios` },
                        { title: 'Privados', url: `${_path.CLINICA}/privados` },
                        { title: 'Convenios', url: `${_path.CLINICA}/actividades` },
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