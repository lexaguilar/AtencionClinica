import { UPDATE_INSS_ID } from "./inssActionTypes";

const inss = 0;

export default function inssReducer(state = inss, { type, payload }) {
    switch (type) {     

        case UPDATE_INSS_ID:
            return payload;

        default:
            return state;
    }

}