import { GET_LIBROMAYOR_ID, UPDATE_LIBROMAYOR_ID } from './libroMayorActionTypes';

// eslint-disable-next-line import/prefer-default-export
export const getLibroMayor = () => ({
    type: GET_LIBROMAYOR_ID
});

export const updateLibroMayor = libroOpts => ({
    type: UPDATE_LIBROMAYOR_ID,
    payload: libroOpts
});