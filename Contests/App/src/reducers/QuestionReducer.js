import * as types from '../actions/ActionTypes.js';

const initialState = {
    questions: [],
    page: 1,
    contest: {
        Name: ''
    }
};

const QuestionReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.QUESTION_PAGE_OPEN:
            return { ...state, contest: action.data };
        case types.QUESTION_LOAD_SUCCESS:
            return Object.assign({}, state, {
                questions: action.data.Records,
                page: action.data.Page
            });
        case types.QUESTION_DELETE_SUCCESS: {
            let records = state.questions.filter(item =>
                item.Id !== action.data.Id
            );
            return { ...state, questions: records };
        }
        case types.QUESTION_ADD_SUCCESS:
            return { ...state, questions: [...state.questions, action.data,] };
        case types.QUESTION_EDIT_SUCCESS: {
            const data = action.data;
            let records = state.questions.map(item =>
                item.Id === data.Id ? { ...item, ...data } : item
            );
            return { ...state, questions: records };
        }
    }

    return state;
};

export default QuestionReducer;
