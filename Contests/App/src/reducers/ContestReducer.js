import * as types from '../actions/ActionTypes.js';

const initialState = {
    contests: [],
    page: 1
};

const ContestReducer = function (state = initialState, action) {
    switch (action.type) {
        case types.CONTEST_LOAD_SUCCESS:
            return Object.assign({}, state, {
                contests: action.data.Records,
                page: action.data.Page
            });
        case types.CONTEST_DELETE_SUCCESS: {
            let records = state.contests.filter(contest =>
                contest.Id !== action.data.Id
            );
            return { ...state, contests: records };
        }
        case types.CONTEST_ADD_SUCCESS:
            return { ...state, contests: [action.data, ...state.contests] };
        case types.CONTEST_EDIT_SUCCESS: {
            const data = action.data;
            let records = state.contests.map(contest =>
                contest.Id === data.Id ? { ...contest, ...data } : contest
            );
            return { ...state, contests: records };
        }
    }

    return state;
};

export default ContestReducer;
