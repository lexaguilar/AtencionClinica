import { dialogDefault, DIALOG_PRIVATE_TRANSFER_WITHPRODUCT } from "../consts";

const mydialog = { ...dialogDefault }

export const dialogPrivateTransferWithProduct = payload => ({ type: DIALOG_PRIVATE_TRANSFER_WITHPRODUCT, payload });

export default function privateTransferWithProdcutDialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [DIALOG_PRIVATE_TRANSFER_WITHPRODUCT] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}