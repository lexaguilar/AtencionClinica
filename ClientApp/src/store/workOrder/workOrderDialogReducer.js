import { dialogDefault, DIALOG_WORKORDER } from "../consts";

const mydialog = { ...dialogDefault }

export const dialogWorkOrder = ({ open, id=0 }) => ({ type: DIALOG_WORKORDER, payload : {open, id} });

export default function workOrderDialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [DIALOG_WORKORDER] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}