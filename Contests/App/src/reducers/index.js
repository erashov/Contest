import { combineReducers } from 'redux';
import GlobalReducer from './GlobalReducer';
import ContestReducer from './ContestReducer';
import ContestFormReducer from './ContestFormReducer';
import ContestDeleteReducer from './ContestDeleteReducer';
import QuestionReducer from './QuestionReducer';
import QuestionFormReducer from './QuestionFormReducer';
import QuestionDeleteReducer from './QuestionDeleteReducer';
import AnswerReducer from './AnswerReducer';
import AnswerFormReducer from './AnswerFormReducer';
import AnswerDeleteReducer from './AnswerDeleteReducer';
import ClientGroupReducer from './ClientGroupReducer';
import ClientGroupFormReducer from './ClientGroupFormReducer';
import ClientGroupDeleteReducer from './ClientGroupDeleteReducer';
import ClientReducer from './ClientReducer';
import ClientFormReducer from './ClientFormReducer';
import ClientDeleteReducer from './ClientDeleteReducer';
import ManageGroupReducer from './ManageGroupReducer';
import DistributionFormReducer from './DistributionFormReducer';

var reducers = combineReducers({
    GlobalState: GlobalReducer,
    ContestState: ContestReducer,
    ContestFormState: ContestFormReducer,
    ContestDeleteState: ContestDeleteReducer,
    QuestionState: QuestionReducer,
    QuestionFormState: QuestionFormReducer,
    QuestionDeleteState: QuestionDeleteReducer,
    AnswerState: AnswerReducer,
    AnswerFormState: AnswerFormReducer,
    AnswerDeleteState: AnswerDeleteReducer,
    ClientGroupState: ClientGroupReducer,
    ClientGroupFormState: ClientGroupFormReducer,
    ClientGroupDeleteState: ClientGroupDeleteReducer,
    ClientState: ClientReducer,
    ClientFormState: ClientFormReducer,
    ClientDeleteState: ClientDeleteReducer,
    ManageGroupState: ManageGroupReducer,
    DistributionFormState: DistributionFormReducer
});

export default reducers;
