import { createProxy, createProxyBase } from "./proxy";

const uri = {
    appointments : createProxyBase('appointments'),
    admisions : createProxyBase('admisions'),
    areas : createProxyBase('areas'),
    areaServices : areaId => createProxyBase(`area/${areaId}/services`),
    bill : createProxyBase('bill'),
    compras: createProxyBase('compras'),
    cie10: createProxyBase('cie10'),
    doctores : createProxyBase('doctores'),
    doctoresTimes : createProxyBase('doctoresTimes'),
    especialidades : createProxyBase('especialidades'),
    estados: createProxyBase('estados'),
    file: createProxy('', 'percapitas/post/file'),
    inPutProducts: createProxyBase('inPutProducts'),
    subsidies: createProxyBase('subsidies'),
    services: createProxyBase('services'),
    products: createProxyBase('products'),
    roles:createProxyBase('roles'),
    users:createProxyBase('users'),

};
uri.privateCustomers = () => {
    let urls = createProxyBase('privateCustomers');
    urls.getAsCatalog = `privateCustomers/get/catalog`
    return urls;
}
uri.resources= roleId => `roles/${roleId}/resources`;
uri.doctores.forSpecialty = specialtyId => `doctores/specialties/${specialtyId}`;
uri.doctores.times = doctorId => `doctores/${doctorId}/times`;
uri.products.getByArea = areaId => `products/getbyarea/${areaId}`;

uri.beneficarios = inss => {
    let urls = createProxy(`beneficiaries/get/${inss}`,`beneficiaries/post`);
    urls.getAsCatalog = `beneficiaries/get/${inss}/catalog`
    return urls;
};

uri.follows = areaId =>  createProxy(`follows/get/${areaId}`,`follows/post`);

uri.account = 'account/auth';

export default uri;