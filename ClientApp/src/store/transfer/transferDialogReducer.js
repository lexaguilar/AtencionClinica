import { dialogDefault, DIALOG_TRANSFER } from "../consts";

const mydialog = { ...dialogDefault }

export const dialogTransfer = payload => ({ type: DIALOG_TRANSFER, payload });

export default function transferDialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [DIALOG_TRANSFER] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}