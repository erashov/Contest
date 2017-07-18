import * as types from './ActionTypes.js';

export const clientGroupsLoadSuccess = data => ({ type: types.CLIENT_GROUP_LOAD_SUCCESS, data });
export const clientGroupsAddSuccess = data => ({ type: types.CLIENT_GROUP_ADD_SUCCESS, data });
export const clientGroupsEditSuccess = data => ({ type: types.CLIENT_GROUP_EDIT_SUCCESS, data });
export const clientGroupsDeleteSuccess = data => ({ type: types.CLIENT_GROUP_DELETE_SUCCESS, data });
