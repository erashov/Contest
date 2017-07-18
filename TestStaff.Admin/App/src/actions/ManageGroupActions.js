import * as types from './ActionTypes.js';

export const formOpen = (data, id, name) => ({ type: types.MANAGE_GROUP_OPEN, data, id, name });
export const clientsInGroupLoadSuccess = data =>
    ({ type: types.MANAGE_GROUP_CLIENTS_IN_GROUP_LOAD_SUCCESS, data });
export const allClientsLoadSuccess = data =>
    ({ type: types.MANAGE_GROUP_ALL_CLIENTS_LOAD_SUCCESS, data });
export const addClientsToGroup = data =>
    ({ type: types.MANAGE_GROUP_ADD_CLIENTS, data });
export const removeClientsFromGroup = data =>
    ({ type: types.MANAGE_GROUP_REMOVE_CLIENTS, data });
export const saveGroupSuccess = data =>
    ({ type: types.MANAGE_GROUP_SAVE_GROUP_SUCCESS, data });
