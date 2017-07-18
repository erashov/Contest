import * as types from '../actions/ActionTypes.js';

const initialState = {
    clients: [],
    clientsInGroup: [],
    page: 1,
    group: {
        Name: ''
    }
};

const ClientReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.CLIENT_PAGE_OPEN:
            return { ...state, group: action.data };
        case types.CLIENT_LOAD_SUCCESS:
            return Object.assign({}, state, {
                clients: action.data.Records,
                page: action.data.Page
            });
        case types.CLIENT_IN_GROUP_LOAD_SUCCESS:
            return Object.assign({}, state, {
                clientsInGroup: action.data.Records,
                page: action.data.Page
            });
        case types.CLIENT_DELETE_SUCCESS: {
            let records = state.clients.filter(item =>
                item.Id !== action.data.Id
            );
            return { ...state, clients: records };
        }
        case types.CLIENT_ADD_SUCCESS:
            return { ...state, clients: [...state.clients, action.data] };
        case types.CLIENT_EDIT_SUCCESS: {
            const data = action.data;
            let records = state.clients.map(item =>
                item.Id === data.Id ? { ...item, ...data } : item
            );
            return { ...state, clients: records };
        }
    }

    return state;
};

export default ClientReducer;
