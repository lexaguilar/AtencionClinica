import { dialogDefault, DIALOG_TRASLATE } from "../consts";

const mydialog = { ...dialogDefault }

export const dialogTraslate = payload => ({ type: DIALOG_TRASLATE, payload });

export default function traslateDialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [DIALOG_TRASLATE] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}