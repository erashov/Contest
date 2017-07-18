import * as types from '../actions/ActionTypes.js';

const initialState = {
    currentRoute: null,
    currentId: null
};

const GlobalReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.SET_CURRENT_ROUTE:
            return { ...state, currentRoute: action.data, currentId: action.data && action.data.id };
    }

    return state;
};

export default GlobalReducer;
