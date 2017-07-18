import * as types from './ActionTypes.js';

export const clientPageOpen = data => ({ type: types.CLIENT_PAGE_OPEN, data });
export const clientLoadSuccess = data => ({ type: types.CLIENT_LOAD_SUCCESS, data });
export const clientInGroupLoadSuccess = data => ({ type: types.CLIENT_IN_GROUP_LOAD_SUCCESS, data });
export const clientAddSuccess = data => ({ type: types.CLIENT_ADD_SUCCESS, data });
export const clientEditSuccess = data => ({ type: types.CLIENT_EDIT_SUCCESS, data });
export const clientDeleteSuccess = data => ({ type: types.CLIENT_DELETE_SUCCESS, data });

