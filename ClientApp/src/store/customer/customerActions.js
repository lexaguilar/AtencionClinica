import { UPDATE_CUSTOMER } from './customerActionTypes';

export const updateCustomer = customer => ({
    type: UPDATE_CUSTOMER,
    payload: customer
});