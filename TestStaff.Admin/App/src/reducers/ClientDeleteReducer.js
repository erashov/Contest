import * as types from '../actions/ActionTypes.js';

const initialState = {
    open: false,
    client: null
};

const ClientDeleteReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.CLIENT_FORM_DELETE_OPEN: {
            return { ...state, open: true, client: action.item };
        }
        case types.CLIENT_FORM_DELETE_CLOSE:
            return { ...state, ...initialState };
    }

    return state;
};

export default ClientDeleteReducer;
