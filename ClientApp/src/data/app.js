export const editorOptions = { stylingMode: "filled" };

export const editorOptionsSelect = {
    valueExpr: "id",
    displayExpr: "name",
    searchEnabled: true
}


export const cssClasses = {
    0 : '',
    1 : 'custome-active',
    2 : 'custome-noactive',
}

export const formatDateTime = 'dd/MM/yyyy hh:mm a';
export const formatDate = 'dd/MM/yyyy';

export const areaRestrict = {
    bodega : 1,
    admision : 2,
    farmacia : 7
}

export const resources = {
    admision : 1,
    citas : 2,
    caja : 3,
    servicios : 4,
    subsidios : 5,
    inventarios : 6,
    movimientos : 7,
    administracion : 8,
    usuarios : 9,
}

export const dataAccess = {
    none : 0x0,
    access : 0x01,
    create : 0x02,
    update : 0x04,
    delete : 0x08
}