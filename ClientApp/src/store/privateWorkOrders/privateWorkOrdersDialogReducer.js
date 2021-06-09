import { dialogDefault, DIALOG_PRIVATEWORKORDERS } from "../consts";

const mydialog = { ...dialogDefault }

export const dialogPrivateWorkOrders = (payload) => ({ type: DIALOG_PRIVATEWORKORDERS, payload });

export default function privateWorkOrdersDialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [DIALOG_PRIVATEWORKORDERS] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}