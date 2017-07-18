import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { questionDeleteSuccess } from '../../../actions/QuestionActions.js';
import { removeQuestion } from '../../../api/question.js';
import { closeForm } from '../../../actions/QuestionDeleteActions.js';

class QuestionDelete extends React.Component {

    handleClose = () => {
        this.props.dispatch(closeForm());
    };

    handleRemove = () => {
        return removeQuestion(this.props.question).then(result => {
            this.props.dispatch(questionDeleteSuccess(result));
            // this.props.dispatch(globalLoaderShow(false));
            this.handleClose();
            return result;
        }).catch((e) => {
            // this.props.dispatch(globalLoaderShow(false));
        });
    };

    render() {
        const actions = [
            <FlatButton
                label="Отмена"
                primary={true}
                onTouchTap={this.handleClose}
                />,
            <FlatButton
                label="Удалить"
                primary={true}
                onTouchTap={this.handleRemove}
                />
        ];

        return (
            <div>
                <Dialog
                    title="Удаление вопроса"
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                    >
                    Вы действительно хотите удалить вопрос?
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        question: store.QuestionDeleteState.question
    };
};

export default connect(mapStateToProps)(QuestionDelete);
