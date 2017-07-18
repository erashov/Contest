import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { answerDeleteSuccess } from '../../../actions/AnswerActions.js';
import { removeAnswer } from '../../../api/answer.js';
import { closeForm } from '../../../actions/AnswerDeleteActions.js';

class AnswerDelete extends React.Component {

    handleClose = () => {
        this.props.dispatch(closeForm());
    };

    handleRemove = () => {
        return removeAnswer(this.props.answer).then(result => {
            this.props.dispatch(answerDeleteSuccess(result));
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
                    title="Удаление ответа"
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                    >
                    Вы действительно хотите удалить ответ?
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        answer: store.AnswerDeleteState.answer
    };
};

export default connect(mapStateToProps)(AnswerDelete);
