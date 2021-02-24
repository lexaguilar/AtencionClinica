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
    providers : createProxyBase('providers'),
    doctoresTimes : createProxyBase('doctoresTimes'),
    especialidades : createProxyBase('especialidades'),
    estados: createProxyBase('estados'),
    file: createProxy('', 'percapitas/post/file'),
    fileRates: createProxy('', 'rates/post/file'),
    inPutProducts: createProxyBase('inPutProducts'),  
    traslates: createProxyBase('traslates'),  
    workOrders: createProxyBase('workOrders'),  
    subsidies: createProxyBase('subsidies'),
    services: createProxyBase('services'),
    products: createProxyBase('products'),
    roles:createProxyBase('roles'),
    users:createProxyBase('users'),
    rates:createProxyBase('rates'),

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
    urls.getInfo = beneficiaryId => `beneficiaries/get/${beneficiaryId}/information`
    return urls;
};

uri.follows = areaId =>  createProxy(`follows/get/${areaId}`,`follows/post`);

uri.account = 'account/auth';
uri.changepassword = 'account/changepassword';

export default uri;