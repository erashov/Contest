import * as types from '../actions/ActionTypes.js';

const initialState = {
    open: false,
    id: null,
    name: '',
    description: '',
    result: '',
    nameErrorText: '',
    descriptionErrorText: '',
    resultErrorText: '',
    isValid: false
};

const ContestFormReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.CONTEST_FORM_OPEN: {
            if(action.item){
                return { 
                    ...state, 
                    open: true,
                    id: action.item.Id,
                    name: action.item.Name,
                    description: action.item.Description,
                    result: action.item.Result
                };
            }

            return { ...state, open: true };
        }
        case types.CONTEST_FORM_CLOSE:
            return { ...state, ...initialState };
        case types.CONTEST_FORM_SET_NAME:
            return { ...state, name: action.name };
        case types.CONTEST_FORM_SET_DESCRIPTION:
            return { ...state, description: action.description };
        case types.CONTEST_FORM_SET_RESULT:
            return { ...state, result: action.result };
        case types.CONTEST_FORM_VALIDATE: 
            return { ...state, ...action.validation};
    }

    return state;
};

export default ContestFormReducer;
