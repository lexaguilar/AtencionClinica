import { dialogDefault, CLOSE_DIALOG_SERVICETEST, OPEN_DIALOG_SERVICETEST } from "../consts";

const mydialog = { ...dialogDefault }

export const openDialogServiceTest = payload => ({
    type: OPEN_DIALOG_SERVICETEST,
    payload
});

export const closeDialogServiceTest = payload => ({
    type: CLOSE_DIALOG_SERVICETEST,
    payload
});

export default function serviceTestDialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [OPEN_DIALOG_SERVICETEST] : () => ({...state,...payload, open : true }),
        [CLOSE_DIALOG_SERVICETEST] : () => ({...state,...payload, open : false })
    }

    return actions[type]?.call() || state;
}