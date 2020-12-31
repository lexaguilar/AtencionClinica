import { SET_ERROR } from './errorActionTypes';
import { createAction } from 'redux-actions';

export const handleError = createAction(SET_ERROR);