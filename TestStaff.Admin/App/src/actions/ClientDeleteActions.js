import * as types from './ActionTypes.js';

export const openForm = item => ({ type: types.CLIENT_FORM_DELETE_OPEN, item });
export const closeForm = () => ({ type: types.CLIENT_FORM_DELETE_CLOSE });
