import * as types from '../actions/ActionTypes.js';

const initialState = {
    open: false,
    question: null
};

const QuestionDeleteReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.QUESTION_FORM_DELETE_OPEN: {
            return { ...state, open: true, question: action.item };
        }
        case types.QUESTION_FORM_DELETE_CLOSE:
            return { ...state, ...initialState };
    }

    return state;
};

export default QuestionDeleteReducer;
