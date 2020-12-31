import { handleActions } from 'redux-actions'
import { SET_ERROR } from './errorActionTypes'

const error = '';

export default handleActions({
    [SET_ERROR]: (state, action) => {
        return action.payload
    }
}, error)