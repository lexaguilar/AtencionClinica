import { createProxy, createProxyBase } from "./proxy";

const uri = {
    appointments : createProxyBase('appointments'),
    admisions : createProxyBase('admisions'),
    bill : createProxyBase('bill'),
    areas : createProxyBase('areas'),
    areaServices : areaId => createProxyBase(`area/${areaId}/services`),
    doctores : createProxyBase('doctores'),
    doctoresTimes : createProxyBase('doctoresTimes'),
    compras: createProxyBase('compras'),
    especialidades : createProxyBase('especialidades'),
    estados: createProxyBase('estados'),
    file: createProxy('', 'percapitas/post/file'),
    subsidies: createProxyBase('subsidies'),
    cie10: createProxyBase('cie10'),
    services: createProxyBase('services'),

};
uri.privateCustomers = () => {
    let urls = createProxyBase('privateCustomers');
    urls.getAsCatalog = `privateCustomers/get/catalog`
    return urls;
}

uri.doctores.forSpecialty = specialtyId => `doctores/specialties/${specialtyId}`;
uri.doctores.times = doctorId => `doctores/${doctorId}/times`;

uri.beneficarios = inss => {
    let urls = createProxy(`beneficiaries/get/${inss}`,`beneficiaries/post`);
    urls.getAsCatalog = `beneficiaries/get/${inss}/catalog`
    return urls;
};

uri.follows = areaId =>  createProxy(`follows/get/${areaId}`,`follows/post`);

uri.account = 'account/auth';

export default uri;