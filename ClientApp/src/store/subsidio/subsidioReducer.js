import { UPDATE_SUBSIDIO } from "./subsidioActionTypes";

const data = {
    open: false, 
};

export default function sudsidioReducer(state = data, { type, payload }) {
    switch (type) {      
        case UPDATE_SUBSIDIO:
            return payload;

        default:
            return state;
    }

}