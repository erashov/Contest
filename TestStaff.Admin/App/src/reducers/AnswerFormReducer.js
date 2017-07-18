import * as types from '../actions/ActionTypes.js';

const initialState = {
    open: false,
    id: null,
    questionId: null,
    text: '',
   // answerType: null,
   // answerTypes: [],
    textErrorText: '',
   // answerTypeErrorText: '',
    isValid: false,
    isCorrect: true
};

const AnswerFormReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.ANSWER_FORM_OPEN: {
            if(action.item){
                return { 
                    ...state, 
                    open: true,
                    id: action.item.Id,
                    text: action.item.Text,
                    questionId: action.item.QuestionId,
                    isCorrect: action.item.Rating > 0
                    //answerType: action.item.AnswerTypeId
                };
            }

            return { ...state, open: true };
        }
        case types.ANSWER_FORM_CLOSE:
            const answerTypes = { answerTypes: state.answerTypes };
            return { ...state, ...initialState, ...answerTypes };
        case types.ANSWER_FORM_SET_TEXT:
            return { ...state, text: action.text };
        case types.ANSWER_FORM_SET_CORRECT:
            return { ...state, isCorrect: action.isCorrect };
        // case types.ANSWER_FORM_SET_TYPE:
        //     return { ...state, answerType: action.answerType };
        case types.ANSWER_FORM_VALIDATE: 
            return { ...state, ...action.validation};
        case types.ANSWER_FORM_ANSWER_TYPE_LOAD_SUCCESS:
            return { ...state, answerTypes: action.data };
    }

    return state;
};

export default AnswerFormReducer;
