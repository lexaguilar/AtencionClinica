import { dialogDefault, DIALOG_PRODUCT } from "../consts";

const mydialog = { ...dialogDefault }

export const dialogProduct =  product => ({ type: DIALOG_PRODUCT, payload : product });

export default function productDialogReducer(state = mydialog, { type, payload }) {
   
    const actions = {
        [DIALOG_PRODUCT] : () => ({...payload })
    }

    return actions[type]?.call() || state;
}