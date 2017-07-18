import * as types from './ActionTypes.js';

export const openForm = item => ({ type: types.QUESTION_FORM_DELETE_OPEN, item });
export const closeForm = () => ({ type: types.QUESTION_FORM_DELETE_CLOSE });
