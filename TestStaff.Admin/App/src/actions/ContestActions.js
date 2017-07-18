import * as types from './ActionTypes.js';

export const contestLoadSuccess = data => ({ type: types.CONTEST_LOAD_SUCCESS, data });
export const contestAddSuccess = data => ({ type: types.CONTEST_ADD_SUCCESS, data });
export const contestEditSuccess = data => ({ type: types.CONTEST_EDIT_SUCCESS, data });
export const contestDeleteSuccess = data => ({ type: types.CONTEST_DELETE_SUCCESS, data });
export const showTestTable = () => ({ type: types.SHOW_TEST_TABLE });
export const hideTestTable = () => ({ type: types.HIDE_TEST_TABLE });
export const moveBack = () => ({ type: types.MOVE_BACK });
export const setCurrentCategory = item => ({ type: types.SET_CURRENT_CATEGORY, item });

