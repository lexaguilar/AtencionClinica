import { dialogDefault, CLOSE_DIALOG_BENEFICIARY, OPEN_DIALOG_BENEFICIARY } from "../consts";

const mydialog = { ...dialogDefault }

export const openDialogBeneficiary = () => ({
    type: OPEN_DIALOG_BENEFICIARY
});

export const closeDialogBeneficiary = () => ({
    type: CLOSE_DIALOG_BENEFICIARY
});

export default function beneficiaryDialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [OPEN_DIALOG_BENEFICIARY] : () => ({...state, open : true }),
        [CLOSE_DIALOG_BENEFICIARY] : () => ({...state, open : false })
    }

    return actions[type]?.call() || state;
}