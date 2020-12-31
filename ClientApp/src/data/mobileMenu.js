import { _path } from "./headerNavigation";

export default [{
        layout: 'conta',
        type: 'link',
        label: 'Home',
        url: '/',
        children: [
            { type: 'link', label: 'Home 1', url: '/' },
            { type: 'link', label: 'Home 2', url: '/home-two' },
        ],
    },

    {
        layout: 'conta',
        type: 'link',
        label: 'Catalogos',
        url: ``,
        children: [{
                type: 'link',
                label: 'Catalos de cuentas',
                url: '',
                children: [
                    { type: 'link', label: 'Cuentas contables', url: `${_path.CONTA}/cuentas` },
                    { type: 'link', label: 'Naturaleza de las cuentas', url: `${_path.CONTA}/naturaleza` },
                    { type: 'link', label: 'Grupo de cuentas', url: `${_path.CONTA}/grupos` },
                    { type: 'link', label: 'Tipo de cuentas', url: `${_path.CONTA}/tipoCuenta` },
                    { type: 'link', label: 'Clasificacion de cuentas', url: `${_path.CONTA}/clasificacion` }
                ],
            },
            {
                type: 'link',
                label: 'Comprobantes',
                url: '',
                children: [
                    { type: 'link', label: 'Tipos de comprobantes', url: `${_path.CONTA}/tipoComprobantes` },
                    { type: 'link', label: 'Centro de costo', url: `${_path.CONTA}/centro-costo` },
                ],
            },
        ],
    },

    {
        layout: 'conta',
        type: 'link',
        label: 'Comprobantes',
        url: '/shop/category-grid-3-columns-sidebar',
        children: [{
            type: 'link',
            label: 'Comprobantes',
            url: `${_path.CONTA}/asientos`
        }]
    },

    {
        layout: 'conta',
        type: 'link',
        label: 'Libros',
        url: '',
        children: [
            { type: 'link', label: 'Libro mayor', url: `${_path.CONTA}/libro/mayor` },
            { type: 'link', label: 'Libro auxiliar', url: `${_path.CONTA}/` },
        ],
    },
    ////Inv
    {
        layout: 'inv',
        type: 'link',
        label: 'Catalogos',
        url: ``,
        children: [{
                type: 'link',
                label: 'Catalos de inventario',
                url: '',
                children: [
                    { type: 'link', label: 'Unidad medida', url: `${_path.INV}/unidadMedida` },
                    { type: 'link', label: 'Presentacion', url: `${_path.INV}/presentacion` },
                    { type: 'link', label: 'Familias', url: `${_path.INV}/familia` },
                ],
            },
            {
                type: 'link',
                label: 'Entidades',
                url: '',
                children: [
                    { type: 'link', label: 'Clientes', url: `${_path.INV}/clientes` },
                    { type: 'link', label: 'Proveedores', url: `${_path.INV}/proveedores` },
                ],
            },
        ],
    },
];