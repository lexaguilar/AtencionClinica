import { dialogDefault, OPEN_DIALOG_FACULTATIVO, CLOSE_DIALOG_FACULTATIVO } from "../consts";

const mydialog = { ...dialogDefault }

export const openDialogFactultativo = payload => ({
    type: OPEN_DIALOG_FACULTATIVO,
    payload
});

export const closeDialogFactultativo = () => ({
    type: CLOSE_DIALOG_FACULTATIVO
});

export default function factultativoDialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [OPEN_DIALOG_FACULTATIVO] : () => ({...state, open : true, ...payload }),
        [CLOSE_DIALOG_FACULTATIVO] : () => ({...state, open : false })
    }

    return actions[type]?.call() || state;
}