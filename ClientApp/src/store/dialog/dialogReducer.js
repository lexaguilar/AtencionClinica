import { dialogDefault, DIALOG_PERCAPITA } from "../consts";

const mydialog = {...dialogDefault, editable: true}

export const openDialog = dialogInfo => ({
    type: DIALOG_PERCAPITA,
    payload: dialogInfo
});

export default function dialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [DIALOG_PERCAPITA] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}