import { dialogDefault, DIALOG_OUTPUTPRODUCT } from "../consts";

const mydialog = { ...dialogDefault }

export const dialogOutputProduct = ({ open }) => ({ type: DIALOG_OUTPUTPRODUCT, payload : open });

export default function outPutProductDialogReducer(state = mydialog, { type, payload }) {
    const actions = {
        [DIALOG_OUTPUTPRODUCT] : () => ({...state, open : payload })
    }

    return actions[type]?.call() || state;
}