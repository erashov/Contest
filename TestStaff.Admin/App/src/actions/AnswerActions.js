import * as types from './ActionTypes.js';

export const answerPageOpen = data => ({ type: types.ANSWER_PAGE_OPEN, data });
export const answerFormOpen = data => ({ type: types.ANSWER_FORM_OPEN, data });
export const answerLoadSuccess = data => ({ type: types.ANSWER_LOAD_SUCCESS, data });
export const answerTypeLoadSuccess = data => ({ type: types.ANSWER_TYPE_LOAD_SUCCESS, data });
export const answerAddSuccess = data => ({ type: types.ANSWER_ADD_SUCCESS, data });
export const answerEditSuccess = data => ({ type: types.ANSWER_EDIT_SUCCESS, data });
export const answerDeleteSuccess = data => ({ type: types.ANSWER_DELETE_SUCCESS, data });
export const answerChange = data => ({ type: types.ANSWER_CHANGE, data });
