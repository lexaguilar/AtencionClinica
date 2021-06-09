import { dialogDefault, DIALOG_PURCHASE } from "../consts";

const mydialog = { ...dialogDefault }

export const dialogPurchase = payload => ({ type: DIALOG_PURCHASE, payload });

export default function purchaseDialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [DIALOG_PURCHASE] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}