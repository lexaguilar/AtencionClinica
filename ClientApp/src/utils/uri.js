import { createProxy, createProxyBase } from "./proxy";

const uri = {
    admisions : createProxyBase('admisions'),
    areas : createProxyBase('areas'),
    compras: createProxyBase('compras'),
    doctores: createProxyBase('doctores'),  
    especialidades : createProxyBase('especialidades'),
    estados: createProxyBase('estados'),
    file: createProxy('', 'percapitas/post/file'),
    subsidies: createProxyBase('subsidies'),
};

uri.beneficarios = inss => {
    let urls = createProxy(`beneficiaries/get/${inss}`,`beneficiaries/post`);
    urls.getAsCatalog = `beneficiaries/get/${inss}/catalog`
    return urls;
};


uri.follows = areaId => {
    let urls = createProxy(`follows/get/${areaId}`,`follows/post`);
    return urls;
};

export default uri;