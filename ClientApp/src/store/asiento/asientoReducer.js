import { GET_ASIENTO_ID, UPDATE_ASIENTO_ID } from "./asientoActionTypes";

const asiendo = {
    id: 0,
    open: false,
    editable: true
};

export default function asientoReducer(state = asiendo, { type, payload }) {
    switch (type) {
        case GET_ASIENTO_ID:

            return state;

        case UPDATE_ASIENTO_ID:
            return payload;

        default:
            return state;
    }

}