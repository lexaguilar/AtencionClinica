import { GET_APPINFO, UPDATE_APPINFO } from './appActionTypes';
import { createAction } from 'redux-actions';
import http from '../../utils/http';


const getAppInfoSuccess = createAction(GET_APPINFO);
export const getAppInfo = () => dispatch => {
    http('about/get-info').asGet()
        .then(resp => dispatch(getAppInfoSuccess(resp)))
        .catch(error => error);

};

const setAppInfoSuccess = createAction(UPDATE_APPINFO);
export const setAppInfo = data => async(dispatch) => {
    return new Promise((resolve, reject) => {
        http('about/set-info').asPost(data)
            .then(resp => {
                dispatch(setAppInfoSuccess(setData(data, resp)));
                resolve();
            }).catch(err => {
                reject(err);
            });
    });
};

const setData = (currentData, newData) => {
    let result = {...currentData, ...exluyeVersion(newData) };
    return result;
}

const exluyeVersion = ({ version, ...resp }) => resp;