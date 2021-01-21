import { createProxy, createProxyBase } from "./proxy";

const uri = {
    appointments : createProxyBase('appointments'),
    admisions : createProxyBase('admisions'),
    areas : createProxyBase('areas'),
    doctores : createProxyBase('doctores'),
    compras: createProxyBase('compras'),
    especialidades : createProxyBase('especialidades'),
    estados: createProxyBase('estados'),
    file: createProxy('', 'percapitas/post/file'),
    subsidies: createProxyBase('subsidies'),
    cie10: createProxyBase('cie10'),
};

uri.doctores.forSpecialty = specialtyId => `doctores/specialties/${specialtyId}`;
uri.doctores.times = doctorId => `doctores/${doctorId}/times`;

uri.beneficarios = inss => {
    let urls = createProxy(`beneficiaries/get/${inss}`,`beneficiaries/post`);
    urls.getAsCatalog = `beneficiaries/get/${inss}/catalog`
    return urls;
};


uri.follows = areaId => {
    let urls = createProxy(`follows/get/${areaId}`,`follows/post`);
    return urls;
};

uri.account = 'account/auth';

export default uri;