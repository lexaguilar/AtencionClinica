import { handleActions } from 'redux-actions'
import { GET_CORTE } from './corteActionTypes'

export default handleActions({
    [GET_CORTE]: (state, action) => {
        return action.payload
    }
}, [])