import { GET_CORTE } from './corteActionTypes';
import { createAction } from 'redux-actions';
import http from '../../utils/http'
import uri from '../../utils/uri'


const getCorteSuccess = createAction(GET_CORTE);
export const getCorte = () => async(dispatch) => {

    http(uri.cortes.get).asGet()
        .then(resp => dispatch(getCorteSuccess(resp)))
        .catch(message => console.log(message));

};