import * as types from '../actions/ActionTypes.js';

const initialState = {
    open: false,
    text: '',
    subject: '',
    groups: [],
    textErrorText: '',
    subjectErrorText: '',
    isValid: false
};

const AnswerReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.DISTRIBUTION_FORM_OPEN:
            return { ...state, open: true };
        case types.DISTRIBUTION_FORM_CLOSE:
            return { ...state, ...initialState };
        case types.DISTRIBUTION_FORM_LOAD_GROUPS_SUCCESS:
            return { ...state, groups: action.data.Records };
        case types.DISTRIBUTION_FORM_CREATE_DISTRIBUTION_SUCCESS:
            return { ...state, answerType: action.data };
        case types.DISTRIBUTION_FORM_SET_TEXT:
            return { ...state, text: action.text };
        case types.DISTRIBUTION_FORM_SET_SUBJECT:
            return { ...state, subject: action.subject };
        case types.DISTRIBUTION_FORM_VALIDATE: 
            return { ...state, ...action.validation};
    }

    return state;
};

export default AnswerReducer;
