import { dialogDefault, DIALOG_WORKORDER } from "../consts";

const mydialog = { ...dialogDefault }

export const dialogWorkOrder = ({ open }) => ({ type: DIALOG_WORKORDER, payload : open });

export default function workOrderDialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [DIALOG_WORKORDER] : () => ({...state, open : payload })
    }

    return actions[type]?.call() || state;
}