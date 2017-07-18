import * as types from '../actions/ActionTypes.js';

const initialState = {
    formOpen: { open: false },
    formOpenResult: {
        Name: ''
    },
    clientGroups: [],
    page: 1
};

const ClientGroupReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.CLIENT_GROUP_LOAD_SUCCESS:
            return Object.assign({}, state, {
                clientGroups: action.data.Records,
                page: action.data.Page
            });
        case types.CLIENT_GROUP_DELETE_SUCCESS: {
            let records = state.clientGroups.filter(item =>
                item.Id !== action.data.Id
            );
            return { ...state, clientGroups: records };
        }
        case types.CLIENT_GROUP_ADD_SUCCESS:
            return { ...state, clientGroups: [...state.clientGroups, action.data] };
        case types.CLIENT_GROUP_EDIT_SUCCESS: {
            const data = action.data;
            let records = state.clientGroups.map(item =>
                item.Id === data.Id ? { ...item, ...data } : item
            );
            return { ...state, clientGroups: records };
        }
    }

    return state;
};

export default ClientGroupReducer;
