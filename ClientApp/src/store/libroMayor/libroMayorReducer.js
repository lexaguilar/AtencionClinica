import { GET_LIBROMAYOR_ID, UPDATE_LIBROMAYOR_ID } from "./libroMayorActionTypes";

const libroMayor = {
    id: 0,
    year: 0,
    mes: 0,
    debe: false,
    open: false,
    cuenta: ''
};

export default function libroMayorReducer(state = libroMayor, { type, payload }) {
    switch (type) {
        case GET_LIBROMAYOR_ID:

            return state;

        case UPDATE_LIBROMAYOR_ID:
            return payload;

        default:
            return state;
    }

}