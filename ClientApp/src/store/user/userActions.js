import { GET_USER, UPDATE_USER } from './userActionTypes';


// eslint-disable-next-line import/prefer-default-export
export const getUser = () => ({
    type: GET_USER
});

export const updateUser = user => ({
    type: UPDATE_USER,
    payload: user
});