import { dialogDefault, DIALOG_TRANSFER_WITHSERVICE } from "../consts";

const mydialog = { ...dialogDefault }

export const dialogTransferWithService = payload => ({ type: DIALOG_TRANSFER_WITHSERVICE, payload });

export default function transferWithServiceDialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [DIALOG_TRANSFER_WITHSERVICE] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}