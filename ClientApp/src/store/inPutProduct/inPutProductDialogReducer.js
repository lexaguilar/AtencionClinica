import { dialogDefault, DIALOG_INPUTPRODUCT } from "../consts";

const mydialog = { ...dialogDefault }

export const dialogInputProduct = ({ open }) => ({ type: DIALOG_INPUTPRODUCT, payload : open });

export default function inPutProductDialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [DIALOG_INPUTPRODUCT] : () => ({...state, open : payload })
    }

    return actions[type]?.call() || state;
}