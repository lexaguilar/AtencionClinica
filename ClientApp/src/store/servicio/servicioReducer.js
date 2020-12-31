import { GET_SERVICIO_ID, UPDATE_SERVICIO_ID } from "./servicioActionTypes";

const servicio = {
    id: 0,
    open: false,
    editable: true
};

export default function servicioReducer(state = servicio, { type, payload }) {
    switch (type) {
        case GET_SERVICIO_ID:

            return state;

        case UPDATE_SERVICIO_ID:
            return payload;

        default:
            return state;
    }

}