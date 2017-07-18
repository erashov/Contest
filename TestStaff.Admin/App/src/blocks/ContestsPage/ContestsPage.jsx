import React from 'react';
import ContestTable from './ContestTable/ContestTable.jsx';
import ContestToolbar from './ContestToolbar/ContestToolbar.jsx';
import ContestForm from './ContestForm/ContestForm.jsx';
import ContestDelete from './ContestDelete/ContestDelete.jsx';
import QuestionsTable from '../QuestionsPage/QuestionsTable/QuestionsTable.jsx';
import QuestionForm from '../QuestionsPage/QuestionForm/QuestionForm.jsx';
import QuestionDelete from '../QuestionsPage/QuestionDelete/QuestionDelete.jsx';
import DistributionForm from '../QuestionsPage/DistributionForm/DistributionForm.jsx';

import { connect } from 'react-redux';

class ContestsPage extends React.Component {
    render() {
        const testBlock =
            <div>
                <ContestTable />
                <ContestForm open={this.props.contestFormOpen} />
                <ContestDelete open={this.props.contestDeleteOpen} />
                <DistributionForm open={this.props.distributionFormOpen} />
            </div>;

        const questionBlock =
            <div>
                <QuestionsTable />
                <QuestionForm open={this.props.questionFormOpen} />
                <QuestionDelete open={this.props.questiontDeleteOpen} />
            </div>;

        return (
            <div className="contests-page">
                <ContestToolbar />
                {this.props.isTestTable ? testBlock : questionBlock}
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        contestFormOpen: store.ContestFormState.open,
        contestDeleteOpen: store.ContestDeleteState.open,
        isTestTable: store.ContestState.isTestTable,

        questionFormOpen: store.QuestionFormState.open,
        questiontDeleteOpen: store.QuestionDeleteState.open,
        distributionFormOpen: store.DistributionFormState.open
    };
};

export default connect(mapStateToProps)(ContestsPage);
