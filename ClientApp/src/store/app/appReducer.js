import { handleActions } from 'redux-actions'
import { GET_APPINFO, UPDATE_APPINFO } from './appActionTypes'

const app = {
    name: 'Sora',
    version: '1.0.0',
    fullName: 'App Sora Counting',

}

export default handleActions({
    [GET_APPINFO]: (state, action) => {
        return action.payload
    },
    [UPDATE_APPINFO]: (state, action) => {
        return action.payload
    }
}, app)