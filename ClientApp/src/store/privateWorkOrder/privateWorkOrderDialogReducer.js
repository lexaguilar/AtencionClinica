import { dialogDefault, DIALOG_PRIVATEWORKORDER } from "../consts";

const mydialog = { ...dialogDefault }

export const dialogPrivateWorkOrder = payload => ({ type: DIALOG_PRIVATEWORKORDER, payload });

export default function privateWorkOrderDialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [DIALOG_PRIVATEWORKORDER] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}