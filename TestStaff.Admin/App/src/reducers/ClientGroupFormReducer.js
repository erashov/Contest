import * as types from '../actions/ActionTypes.js';

const initialState = {
    open: false,
    id: null,
    name: '',
    nameErrorText: '',
    isValid: false
};

const ClientGroupFormReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.CLIENT_GROUP_FORM_OPEN: {
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
        case types.CLIENT_GROUP_FORM_CLOSE:
            return { ...state, ...initialState };
        case types.CLIENT_GROUP_FORM_SET_NAME:
            return { ...state, name: action.name };
        case types.CLIENT_GROUP_FORM_VALIDATE: 
            return { ...state, ...action.validation};
    }

    return state;
};

export default ClientGroupFormReducer;
