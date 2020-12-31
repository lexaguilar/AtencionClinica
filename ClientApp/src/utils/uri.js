import { createProxy, createProxyBase } from "./proxy";

const uri = {
    actividades: createProxyBase('actividades'),
    agendas: createProxyBase('agendas'),
    clientes: createProxyBase('clientes'),
    estados: createProxyBase('estados'),
    doctores: createProxyBase('doctores'),
    vendedores: createProxyBase('vendedores'),
    file: createProxy('', 'tasaCambio/post/file'),
    compras: createProxyBase('compras'),
};

uri.compras.descargar = `compras/descargar`;
uri.account = 'account/auth';

export default uri;