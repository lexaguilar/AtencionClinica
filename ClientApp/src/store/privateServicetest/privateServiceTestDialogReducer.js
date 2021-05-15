import { dialogDefault, CLOSE_PRIVATE_DIALOG_SERVICETEST, OPEN_PRIVATE_DIALOG_SERVICETEST } from "../consts";

const mydialog = { ...dialogDefault }

export const openDialogPrivateServiceTest = payload => ({
    type: OPEN_PRIVATE_DIALOG_SERVICETEST,
    payload
});

export const closeDialogPrivateServiceTest = payload => ({
    type: CLOSE_PRIVATE_DIALOG_SERVICETEST,
    payload
});

export default function privateServiceTestDialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [OPEN_PRIVATE_DIALOG_SERVICETEST] : () => ({...state,...payload, open : true }),
        [CLOSE_PRIVATE_DIALOG_SERVICETEST] : () => ({...state,...payload, open : false })
    }

    return actions[type]?.call() || state;
}