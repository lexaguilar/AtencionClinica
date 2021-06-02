import { DIALOG_CONVERTPRODUCT } from "../consts";

export const dialogConvertProduct = payload => ({ type: DIALOG_CONVERTPRODUCT, payload });

export default function convertProductDialogReducer(state = {}, { type, payload }) {

    const actions = {
        [DIALOG_CONVERTPRODUCT] : () => ({...state, ...payload })
    };

    return actions[type]?.call() || state;
}