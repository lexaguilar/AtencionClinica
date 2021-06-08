import { dialogDefault, DIALOG_WORKORDER_OUT_FOLLOW } from "../consts";

const mydialog = { ...dialogDefault }

export const dialogWorkOrderOutFollow= ({ open, id=0, beneficiaryId = 0 }) => ({ type: DIALOG_WORKORDER_OUT_FOLLOW, payload : {open, id, beneficiaryId} });

export default function workOrderOutFollowDialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [DIALOG_WORKORDER_OUT_FOLLOW] : () => ({...state, ...payload })
    }

    return actions[type]?.call() || state;
}