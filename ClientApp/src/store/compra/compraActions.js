import { GET_COMPRA_ID, UPDATE_COMPRA_ID } from './compraActionTypes';


// eslint-disable-next-line import/prefer-default-export
export const getCompraId = () => ({
    type: GET_COMPRA_ID
});

export const updateCompra = compra => ({
    type: UPDATE_COMPRA_ID,
    payload: compra
});