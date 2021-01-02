export const _path = {
    CLINICA: '/clinica',    
    ACCOUNT : '/account'
}

const menu = [{
    layout: 'clinica',
    title: 'Admision',
    url: '',
    submenu: {
        type: 'menu',
        menu: [
            { title: 'Nueva Admision', url: `${_path.CLINICA}/usuarios` },
            { title: 'Admisiones', url: `${_path.CLINICA}/roles` },
            { title: 'Reportes', url: `${_path.CLINICA}/recursos` }
        ],
    },
},{
    layout: 'clinica',
    title: 'Citas',
    url: '',
    submenu: {
        type: 'menu',
        menu: [
            { title: 'Nueva Cita', url: `${_path.CLINICA}/usuarios` },
            { title: 'Citas', url: `${_path.CLINICA}/roles` },
            { title: 'Reportes', url: `${_path.CLINICA}/recursos` }
        ],
    },
},{
    layout: 'clinica',
    title: 'Servicios',
    url: `${_path.CLINICA}/facturas`
},{
    layout: 'clinica',
    title: 'Clientes',
    url: '',
    submenu: {
        type: 'menu',
        menu: [
            { title: 'Gestion de clientes', url: `${_path.CLINICA}/clientes` },
            { 
                title: 'Reportes', 
                url: ``,
                submenu : [
                    { title: 'Reporte 1', url: `${_path.CLINICA}/reportes/1` },
                    { title: 'Reporte 2', url: `${_path.CLINICA}/reportes/2` },
                ]
            },          
        ],
    },
},

{
    layout: 'clinica',
    title: 'Inventario',
    url: ''
},

{
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
                    title: 'Laboratorio',
                    url: '',
                    links: [
                        { title: 'Procedimientos', url: `${_path.CLINICA}/proveedores` },
                        { title: 'Examenes', url: `${_path.CLINICA}/agenda/vendedores` },
                    ],
                },]
            },{
                size: 6,
                links: [{
                    title: 'Asegurados',
                    url: '',
                    links: [
                        { title: 'Percapita', url: `${_path.CLINICA}/config/percapitas` },
                        { title: 'Beneficiarios', url: `${_path.CLINICA}/actividades` },
                        { title: 'Privados', url: `${_path.CLINICA}/actividades` },
                        { title: 'Convenios', url: `${_path.CLINICA}/actividades` },
                    ],
                },]
            },{
                size: 6,
                links: [{
                    title: 'Configuraciones',
                    url: '',
                    links: [
                        { title: 'Areas', url: `${_path.CLINICA}/agenda/doctores` },
                        { title: 'Inventario', url: `${_path.CLINICA}/actividades` },
                    ],
                },]
            }]
        }

    },
},
{
    layout: 'clinica',
    title: 'Configuración',
    url: '',
    submenu: {
        type: 'menu',
        menu: [
            { title: 'Usuarios', url: `${_path.CLINICA}/usuarios` },
            { title: 'Roles', url: `${_path.CLINICA}/roles` },
            { title: 'Recursos', url: `${_path.CLINICA}/recursos` }
        ],
    },
}
];


export default menu;