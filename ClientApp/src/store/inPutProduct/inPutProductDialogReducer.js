import { dialogDefault, DIALOG_INPUTPRODUCT } from "../consts";

const mydialog = { ...dialogDefault }

export const dialogInputProduct = payload => ({ type: DIALOG_INPUTPRODUCT, payload });

export default function inPutProductDialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [DIALOG_INPUTPRODUCT] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}