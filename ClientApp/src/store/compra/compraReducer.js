import { GET_COMPRA_ID, UPDATE_COMPRA_ID } from "./compraActionTypes";

const compra = {
    id: 0,
    open: false,
    editable: true,
    descarga: false
};

export default function compraReducer(state = compra, { type, payload }) {
    switch (type) {
        case GET_COMPRA_ID:

            return state;

        case UPDATE_COMPRA_ID:
            return payload;

        default:
            return state;
    }

}