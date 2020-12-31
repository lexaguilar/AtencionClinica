import { GET_FACTURA_ID, UPDATE_FACTURA_ID } from "./facturaActionTypes";

const factura = {
    id: 0,
    open: false,
    editable: true
};

export default function facturaReducer(state = factura, { type, payload }) {
    switch (type) {
        case GET_FACTURA_ID:

            return state;

        case UPDATE_FACTURA_ID:
            return payload;

        default:
            return state;
    }

}