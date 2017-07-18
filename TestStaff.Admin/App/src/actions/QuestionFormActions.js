import * as types from './ActionTypes.js';

export const openForm = item => ({ type: types.QUESTION_FORM_OPEN, item });
export const closeForm = () => ({ type: types.QUESTION_FORM_CLOSE });
export const setText = text => ({ type: types.QUESTION_FORM_SET_TEXT, text });
export const setQuestionType = questionType => ({ type: types.QUESTION_FORM_SET_TYPE, questionType });
export const validate = validation => ({ type: types.QUESTION_FORM_VALIDATE, validation });
export const questionTypeLoadSuccess = data => ({ type: types.QUESTION_FORM_QUESTION_TYPE_LOAD_SUCCESS, data });
