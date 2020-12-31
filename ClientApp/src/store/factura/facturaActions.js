import { GET_FACTURA_ID, UPDATE_FACTURA_ID } from './facturaActionTypes';


// eslint-disable-next-line import/prefer-default-export
export const getFacturaId = () => ({
    type: GET_FACTURA_ID
});

export const updateFactura = factura => ({
    type: UPDATE_FACTURA_ID,
    payload: factura
});