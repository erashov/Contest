import * as types from '../actions/ActionTypes.js';

const initialState = {
    open: false,
    id: null,
    contestId: null,
    text: '',
    questionType: null,
    questionTypes: [],
    textErrorText: '',
    questionTypeErrorText: '',
    isValid: false
};

const QuestionFormReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.QUESTION_FORM_OPEN: {
            if(action.item){
                return { 
                    ...state, 
                    open: true,
                    id: action.item.Id,
                    text: action.item.Text,
                    contestId: action.item.ContestId,
                    questionType: action.item.QuestionTypeId
                };
            }

            return { ...state, open: true };
        }
        case types.QUESTION_FORM_CLOSE:
            const questionTypes = { questionTypes: state.questionTypes };
            return { ...state, ...initialState, ...questionTypes };
        case types.QUESTION_FORM_SET_TEXT:
            return { ...state, text: action.text };
        case types.QUESTION_FORM_SET_TYPE:
            return { ...state, questionType: action.questionType };
        case types.QUESTION_FORM_VALIDATE: 
            return { ...state, ...action.validation};
        case types.QUESTION_FORM_QUESTION_TYPE_LOAD_SUCCESS:
            return { ...state, questionTypes: action.data };
    }

    return state;
};

export default QuestionFormReducer;
