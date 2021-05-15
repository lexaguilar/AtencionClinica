import { dialogDefault, DIALOG_PRIVATE_TRANSFER_WITHSERVICE } from "../consts";

const mydialog = { ...dialogDefault }

export const dialogPrivateTransferWithService = payload => ({ type: DIALOG_PRIVATE_TRANSFER_WITHSERVICE, payload });

export default function transferPrivateWithServiceDialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [DIALOG_PRIVATE_TRANSFER_WITHSERVICE] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}