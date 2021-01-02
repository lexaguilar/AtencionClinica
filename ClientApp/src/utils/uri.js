import { createProxy, createProxyBase } from "./proxy";

const uri = {
   
    estados: createProxyBase('estados'),
    doctores: createProxyBase('doctores'),
    vendedores: createProxyBase('vendedores'),
    file: createProxy('', 'percapitas/post/file'),
    compras: createProxyBase('compras'),
};

export default uri;