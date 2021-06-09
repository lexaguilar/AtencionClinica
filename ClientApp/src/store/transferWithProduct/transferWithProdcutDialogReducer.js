import { dialogDefault, DIALOG_TRANSFER_WITHPRODUCT } from "../consts";

const mydialog = { ...dialogDefault }

export const dialogTransferWithProduct = payload => ({ type: DIALOG_TRANSFER_WITHPRODUCT, payload });

export default function transferWithProdcutDialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [DIALOG_TRANSFER_WITHPRODUCT] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}