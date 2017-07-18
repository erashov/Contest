import * as types from './ActionTypes.js';

export const openForm = item => ({ type: types.CLIENT_FORM_OPEN, item });
export const closeForm = () => ({ type: types.CLIENT_FORM_CLOSE });
export const setName = name => ({ type: types.CLIENT_FORM_SET_NAME, name });
export const setEmail = email => ({ type: types.CLIENT_FORM_SET_EMAIL, email });
export const validate = validation => ({ type: types.CLIENT_FORM_VALIDATE, validation });
