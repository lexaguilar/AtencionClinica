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
    layout: 'clinica',
    title: 'Inventario',
    url: ''
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
                        { title: 'Procedimientos', url: `${_path.CLINICA}/procedimeintos` },
                        { title: 'Perfiles', url: `${_path.CLINICA}/perfiles/procedimeintos` },
                        { title: 'Procedimientos por area', url: `${_path.CLINICA}/area/procedimeintos` },
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
            { title: 'Recursos', url: `${_path.CLINICA}/recursos` }
        ],
    },
}];


export default menu;