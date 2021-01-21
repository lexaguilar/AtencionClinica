import { DIALOG_CUSTOMER } from "../consts";

const mydialog = { clear: true}

export const clearCustomer = dialogInfo => ({
    type: DIALOG_CUSTOMER,
    payload: dialogInfo
});

export default function customerClearReducer(state = mydialog, { type, payload }) {
    const actions = {
        [DIALOG_CUSTOMER] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}