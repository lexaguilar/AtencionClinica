import { GET_USER, UPDATE_USER } from "./userActionTypes";

const user = {
    username: '',
    areaId: null,
    area: ''
};



export default function userReducer(state = user, { type, payload }) {
    switch (type) {
        case GET_USER:

            var user =JSON.parse(localStorage.getItem('user'));

            return {...state, ...user};

        case UPDATE_USER:
            let newState = {...state, ...payload }
            return newState;

        default:
            var user =JSON.parse(localStorage.getItem('user'));

            return {...state, ...user};
    }

}