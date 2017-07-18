import * as types from '../actions/ActionTypes.js';

const initialState = {
    answers: [],
    page: 1,
    question: {
        Text: ''
    }
};

const AnswerReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.ANSWER_PAGE_OPEN:
            return { ...state, question: action.data };
        case types.ANSWER_LOAD_SUCCESS:
            return Object.assign({}, state, {
                answers: action.data.Records,
                page: action.data.Page
            });
        case types.ANSWER_DELETE_SUCCESS: {
            let records = state.answers.filter(item =>
                item.Id !== action.data.Id
            );
            return { ...state, answers: records };
        }
        case types.ANSWER_ADD_SUCCESS:
            return { ...state, answers: [...state.answers, action.data,] };
        case types.ANSWER_EDIT_SUCCESS: {
            const data = action.data;
            let records = state.answers.map(item =>
                item.Id === data.Id ? { ...item, ...data } : item
            );
            return { ...state, answers: records };
        }
    }

    return state;
};

export default AnswerReducer;
