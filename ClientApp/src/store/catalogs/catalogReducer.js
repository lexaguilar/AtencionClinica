import { catalogsName, GET_CATALOGS } from '../consts';
import { createAction, handleActions } from 'redux-actions';
import http from '../../utils/http';

const getCatalogSuccess = createAction(GET_CATALOGS);
export const getCatalogs = () => dispatch => {
    http('catalogos/get-catalog-gerenals').asGet()
        .then(resp => {
            localStorage.setItem(catalogsName, JSON.stringify(resp))
            dispatch(getCatalogSuccess(resp))
        })
        .catch(error => error);

};

const catalog = {   
    
}

export default handleActions({   
    [GET_CATALOGS]: (state, action) => {
        return action.payload
    }
}, catalog)