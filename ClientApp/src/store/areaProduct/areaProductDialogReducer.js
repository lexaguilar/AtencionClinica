import { DIALOG_AREAPRODUCT } from "../consts";

export const dialogAreaProduct = payload => ({ type: DIALOG_AREAPRODUCT, payload });

export default function areaProductDialogReducer(state = {}, { type, payload }) {

    const actions = {
        [DIALOG_AREAPRODUCT] : () => ({...state, ...payload })
    };

    return actions[type]?.call() || state;
}