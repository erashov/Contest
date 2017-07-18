import * as types from '../actions/ActionTypes.js';

const initialState = {
    currentRoute: null
};

const GlobalReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.SET_CURRENT_ROUTE:
            return { ...state, currentRoute: action.data };
    }

    return state;
};

export default GlobalReducer;
