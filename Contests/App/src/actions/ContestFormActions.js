import * as types from './ActionTypes.js';

export const openForm = item => ({ type: types.CONTEST_FORM_OPEN, item });
export const closeForm = () => ({ type: types.CONTEST_FORM_CLOSE });
export const setName = name => ({ type: types.CONTEST_FORM_SET_NAME, name });
export const setDescription = description => ({ type: types.CONTEST_FORM_SET_DESCRIPTION, description });
export const setResult = result => ({ type: types.CONTEST_FORM_SET_RESULT, result });
export const validate = validation => ({ type: types.CONTEST_FORM_VALIDATE, validation });
