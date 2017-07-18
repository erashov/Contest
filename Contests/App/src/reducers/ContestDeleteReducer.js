import * as types from '../actions/ActionTypes.js';

const initialState = {
    open: false,
    contest: null
};

const ContestDeleteReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.CONTEST_FORM_DELETE_OPEN: {
            return { ...state, open: true, contest: action.item };
        }
        case types.CONTEST_FORM_DELETE_CLOSE:
            return { ...state, ...initialState };
    }

    return state;
};

export default ContestDeleteReducer;
