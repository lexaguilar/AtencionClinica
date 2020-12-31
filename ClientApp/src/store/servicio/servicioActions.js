import { GET_SERVICIO_ID, UPDATE_SERVICIO_ID } from './servicioActionTypes';

export const getServicioId = () => ({
    type: GET_SERVICIO_ID
});

export const updateServicio = servicio => ({
    type: UPDATE_SERVICIO_ID,
    payload: servicio
});
