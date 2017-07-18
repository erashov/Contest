import * as types from '../actions/ActionTypes.js';

const initialState = {
    open: false,
    id: null,
    name: '',
    nameErrorText: '',
    email: '',
    emailErrorText: '',
    isValid: false
};

const ClientFormReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.CLIENT_FORM_OPEN: {
            if(action.item){
                return { 
                    ...state, 
                    open: true,
                    id: action.item.Id,
                    name: action.item.Name,
                    email: action.item.Email
                };
            }

            return { ...state, open: true };
        }
        case types.CLIENT_FORM_CLOSE:
            return { ...state, ...initialState };
        case types.CLIENT_FORM_SET_NAME:
            return { ...state, name: action.name };
        case types.CLIENT_FORM_SET_EMAIL:
            return { ...state, email: action.email };
        case types.CLIENT_FORM_VALIDATE: 
            return { ...state, ...action.validation};
    }

    return state;
};

export default ClientFormReducer;
