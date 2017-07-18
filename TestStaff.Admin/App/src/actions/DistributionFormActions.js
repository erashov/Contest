import * as types from './ActionTypes.js';

export const openForm = item => ({ type: types.DISTRIBUTION_FORM_OPEN, item });
export const closeForm = () => ({ type: types.DISTRIBUTION_FORM_CLOSE });
export const setText = text => ({ type: types.DISTRIBUTION_FORM_SET_TEXT, text });
export const setSubject = subject => ({ type: types.DISTRIBUTION_FORM_SET_SUBJECT, subject });
export const createDistributionSuccess = data =>
    ({ type: types.DISTRIBUTION_FORM_CREATE_DISTRIBUTION_SUCCESS, data });
export const loadGroupsSuccess = data =>
    ({ type: types.DISTRIBUTION_FORM_LOAD_GROUPS_SUCCESS, data });
export const validate = validation => ({ type: types.DISTRIBUTION_FORM_VALIDATE, validation });
