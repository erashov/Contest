import React from 'react';
import QuestionsToolbar from './QuestionsToolbar/QuestionsToolbar.jsx';
import QuestionsTable from './QuestionsTable/QuestionsTable.jsx';
import QuestionForm from './QuestionForm/QuestionForm.jsx';
import QuestionDelete from './QuestionDelete/QuestionDelete.jsx';
import DistributionForm from './DistributionForm/DistributionForm.jsx';
import { connect } from 'react-redux';

class QuestionsPage extends React.Component {
    render() {
        return (
            <div className="questions-page">
                <QuestionsToolbar />
                <QuestionsTable />
                <QuestionForm open={this.props.questionFormOpen} />
                <QuestionDelete open={this.props.questiontDeleteOpen} />
                <DistributionForm open={this.props.distributionFormOpen} />
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        questionFormOpen: store.QuestionFormState.open,
        questiontDeleteOpen: store.QuestionDeleteState.open,
        distributionFormOpen: store.DistributionFormState.open
    };
};

export default connect(mapStateToProps)(QuestionsPage);
