export const _path = {
    CLINICA: '/clinica',    
    ACCOUNT : '/account'
}

const menu = [{
    layout: 'clinica',
    title: 'Facturación',
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
    title: 'Proveedores',
    url: '',
    submenu: {
        type: 'menu',
        menu: [
            { title: 'Gestion de proveedores', url: `${_path.CLINICA}/libro/mayor` },
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
    title: 'Agenda',
    url: `${_path.CLINICA}/agenda`
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
                    title: 'Facturacion',
                    url: '',
                    links: [
                        { title: 'Proveedores', url: `${_path.CLINICA}/proveedores` },
                        { title: 'Vendedores', url: `${_path.CLINICA}/agenda/vendedores` },
                    ],
                },]
            },{
                size: 6,
                links: [{
                    title: 'Agenda',
                    url: '',
                    links: [
                        { title: 'Doctores', url: `${_path.CLINICA}/agenda/doctores` },
                        { title: 'Actividades', url: `${_path.CLINICA}/actividades` },
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