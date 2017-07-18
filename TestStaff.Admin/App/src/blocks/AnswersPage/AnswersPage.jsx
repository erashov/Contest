import React from 'react';
import AnswerToolbar from './AnswerToolbar/AnswerToolbar.jsx';
import AnswersTable from './AnswersTable/AnswersTable.jsx';
import AnswerForm from './AnswerForm/AnswerForm.jsx';
import AnswerDelete from './AnswerDelete/AnswerDelete.jsx';
import { connect } from 'react-redux';

class AnswersPage extends React.Component {
    render() {
        return (
            <div className="answers-page">
                <AnswerToolbar />
                <AnswersTable />
                <AnswerForm open={this.props.answerFormOpen} />
                <AnswerDelete open={this.props.answerDeleteOpen} />
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        answerFormOpen: store.AnswerFormState.open,
        answerDeleteOpen: store.AnswerDeleteState.open
    };
};

export default connect(mapStateToProps)(AnswersPage);
