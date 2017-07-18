import * as types from '../actions/ActionTypes.js';

const initialState = {
    open: false,
    answer: null
};

const AnswerDeleteReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.ANSWER_FORM_DELETE_OPEN: {
            return { ...state, open: true, answer: action.item };
        }
        case types.ANSWER_FORM_DELETE_CLOSE:
            return { ...state, ...initialState };
    }

    return state;
};

export default AnswerDeleteReducer;
