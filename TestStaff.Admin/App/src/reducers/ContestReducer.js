import * as types from '../actions/ActionTypes.js';

const initialState = {
    contests: [],
    page: 1,
    isTestTable: true,
    currentCategory: null
};

const ContestReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.CONTEST_LOAD_SUCCESS: {
            return { ...state, contests: action.data.Records };
        }
        case types.CONTEST_DELETE_SUCCESS: {
            let records = state.contests.filter(contest =>
                contest.Id !== action.data.Id
            );
            return { ...state, contests: records };
        }
        case types.CONTEST_ADD_SUCCESS:
            return { ...state, contests: [...state.contests, action.data] };
        case types.CONTEST_EDIT_SUCCESS: {
            const data = action.data;
            let records = state.contests.map(contest =>
                contest.Id === data.Id ? { ...contest, ...data } : contest
            );
            return { ...state, contests: records };
        }
        case types.SHOW_TEST_TABLE: 
            return { ...state, isTestTable: true };
        case types.HIDE_TEST_TABLE: 
            return { ...state, isTestTable: false };      
        case types.SET_CURRENT_CATEGORY: {
            const isTestTable = action.item === null || action.item.Questions.length === 0;
            return { ...state, currentCategory: action.item, isTestTable };   
        }
    }

    return state;
};

export default ContestReducer;
