import { dialogDefault, DIALOG_WORKORDERS } from "../consts";

const mydialog = { ...dialogDefault }

export const dialogWorkOrders = (payload) => ({ type: DIALOG_WORKORDERS, payload });

export default function workOrdersDialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [DIALOG_WORKORDERS] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}