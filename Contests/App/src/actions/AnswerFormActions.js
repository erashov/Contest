import * as types from './ActionTypes.js';

export const openForm = item => ({ type: types.ANSWER_FORM_OPEN, item });
export const closeForm = () => ({ type: types.ANSWER_FORM_CLOSE });
export const setText = text => ({ type: types.ANSWER_FORM_SET_TEXT, text });
export const setAnswerType = answerType => ({ type: types.ANSWER_FORM_SET_TYPE, answerType });
export const validate = validation => ({ type: types.ANSWER_FORM_VALIDATE, validation });
export const answerTypeLoadSuccess = data => ({ type: types.ANSWER_FORM_ANSWER_TYPE_LOAD_SUCCESS, data });
