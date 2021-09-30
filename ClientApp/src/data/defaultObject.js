import moment from 'moment';

export const traslateDefault ={
    date : new Date(moment().year(), moment().month(), moment().date(), 0, 0, 0, 0),
    areaId: 0,
    observaction: '',
}

export const inPutProductDefault = {
    date : new Date(moment().year(), moment().month(), moment().date(), 0, 0, 0, 0),
}

export const outPutProductDefault = {
    ...inPutProductDefault
}

export const workOrderDefault = {
    date: new Date(moment().year(), moment().month(), moment().date(), 0, 0, 0, 0),
}


export const purchaseDefault = {
    areaId: 0,
    date : new Date(moment().year(), moment().month(), moment().date(), 0, 0, 0, 0),
    typeId:0,
    purchaseTypeId:1,//Contado
    providerId: null,
    observaction: '',
    rate : 0,

}