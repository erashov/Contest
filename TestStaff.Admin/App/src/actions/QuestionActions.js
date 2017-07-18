import * as types from './ActionTypes.js';

export const questionPageOpen = data => ({ type: types.QUESTION_PAGE_OPEN, data });
export const questionLoadSuccess = data => ({ type: types.QUESTION_LOAD_SUCCESS, data });
export const questionAddSuccess = data => ({ type: types.QUESTION_ADD_SUCCESS, data });
export const questionEditSuccess = data => ({ type: types.QUESTION_EDIT_SUCCESS, data });
export const questionDeleteSuccess = data => ({ type: types.QUESTION_DELETE_SUCCESS, data });
