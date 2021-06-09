import { dialogDefault, DIALOG_OUTPUTPRODUCT } from "../consts";

const mydialog = { ...dialogDefault }

export const dialogOutputProduct = payload => ({ type: DIALOG_OUTPUTPRODUCT, payload });

export default function outPutProductDialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [DIALOG_OUTPUTPRODUCT] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}