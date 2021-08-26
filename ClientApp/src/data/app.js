export const editorOptions = { stylingMode: "filled" };

export const editorOptionsSelect = {
    valueExpr: "id",
    displayExpr: "name",
    searchEnabled: true
}


export const editorOptionsSwitch = {
    switchedOffText:"NO",
    switchedOnText:"SI",
}

export const editorOptionsNumberBox={
    showSpinButtons:true,
    showClearButton:true
}

export const editorOptsTextBoxPhone={
    mask: "0000-0000"
}

export const editorOptsTextBox={
    showClearButton:true
}

export const types = {
    private : 'private',
    inss : 'inss'
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
    laboratorio : 4,
    farmacia : 7,
    farmaciaPrivada : 9,

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
    requisas : 10,
    compras : 11,
    puestoMedicos : 12,
    app : 13
}

export const dataAccess = {
    none : 0x0,
    access : 0x01,
    create : 0x02,
    update : 0x04,
    delete : 0x08
}