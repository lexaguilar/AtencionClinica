import { dialogDefault, OPEN_DIALOG, CLOSE_DIALOG } from "../consts";

const mydialog = { ...dialogDefault }

export const openDialog = ({id}) => ({ type: OPEN_DIALOG, payload : id });
export const closeDialog = () => ({ type: CLOSE_DIALOG });

export default function customDialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [OPEN_DIALOG] : () => ({...state, ...{open : true, id : payload} }),
        [CLOSE_DIALOG] : () => ({...state, ...{open : false, id : 0} })
    }

    return actions[type]?.call() || state;
}