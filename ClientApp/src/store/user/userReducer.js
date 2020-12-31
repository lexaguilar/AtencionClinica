import { GET_USER, UPDATE_USER } from "./userActionTypes";

const user = {
    corteId: 2,
    username: 'aaguilare',
    areaId: 1,
    areaDescripcion: 'Bodega Central'
};

export default function userReducer(state = user, { type, payload }) {
    switch (type) {
        case GET_USER:

            return state;

        case UPDATE_USER:
            let newState = {...state, ...payload }
            return newState;

        default:
            return state;
    }

}