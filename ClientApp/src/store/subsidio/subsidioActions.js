import { UPDATE_SUBSIDIO } from './subsidioActionTypes';

export const updateSubsidio = subsidio => ({
    type: UPDATE_SUBSIDIO,
    payload: subsidio
});