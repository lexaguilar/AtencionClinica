import { GET_ASIENTO_ID, UPDATE_ASIENTO_ID } from './asientoActionTypes';


// eslint-disable-next-line import/prefer-default-export
export const getAsientoId = () => ({
    type: GET_ASIENTO_ID
});

export const updateAsiento = asiento => ({
    type: UPDATE_ASIENTO_ID,
    payload: asiento
});