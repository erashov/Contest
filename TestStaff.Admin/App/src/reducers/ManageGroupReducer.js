import * as types from '../actions/ActionTypes.js';
import { arrayDiff } from '../helper/helper.js';

const initialState = {
    formOpen: { open: false },
    clientsInGroup: [],
    allClients: [],
    id: 0,
    name: ''
};

const ManageGroupReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.MANAGE_GROUP_OPEN:
            return { ...state, formOpen: action.data, id: action.id, name: action.name };
        case types.MANAGE_GROUP_CLIENTS_IN_GROUP_LOAD_SUCCESS:
            return { ...state, clientsInGroup: action.data.Records };
        case types.MANAGE_GROUP_ALL_CLIENTS_LOAD_SUCCESS:
            return { 
                ...state, 
                allClients: arrayDiff(action.data.Records, state.clientsInGroup)
            };
        case types.MANAGE_GROUP_REMOVE_CLIENTS:
            return {
                ...state,
                clientsInGroup: arrayDiff(state.clientsInGroup, action.data),
                allClients: [...state.allClients, ...action.data]
            };
        case types.MANAGE_GROUP_ADD_CLIENTS:
            return {
                ...state,
                clientsInGroup: [...state.clientsInGroup, ...action.data],
                allClients: arrayDiff(state.allClients, action.data)
            };
    }

    return state;
};

export default ManageGroupReducer;
