import { UPDATE_CUSTOMER } from "./customerActionTypes";

const customer = {
    inss :'',
    firstName : '',
    lastName :'',
    customerStatusId : 0,
    customerTypeId : 0,
};

export default function customerReducer(state = customer, { type, payload }) {
    switch (type) {
       
        case UPDATE_CUSTOMER:
            return payload;

        default:
            return state;
    }

}