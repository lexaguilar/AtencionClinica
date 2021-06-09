import moment from 'moment';
export const admisionDefault = {
    areaId: null,
    typeId: null,
    beneficiaryId: null,
    specialtyId: null,
    observaction: '',
    motive: '',
}


export const admisionPuestoMedicoDefault = {
    areaId: null,
    doctorId: null,
    beneficiaryId: null,
    specialtyId: null,
    reference: '',
    motive: '',
    date: new Date(moment().year(), moment().month(), moment().date(), 0, 0, 0, 0),
}