import * as types from '../actions/ActionTypes.js';

const initialState = {
    open: false,
    clientGroup: null
};

const ClientGroupDeleteReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.CLIENT_GROUP_FORM_DELETE_OPEN: {
            return { ...state, open: true, clientGroup: action.item };
        }
        case types.CLIENT_GROUP_FORM_DELETE_CLOSE:
            return { ...state, ...initialState };
    }

    return state;
};

export default ClientGroupDeleteReducer;
