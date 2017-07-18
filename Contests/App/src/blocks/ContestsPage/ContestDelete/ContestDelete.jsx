import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { contestDeleteSuccess } from '../../../actions/ContestActions.js';
import { closeForm } from '../../../actions/ContestDeleteActions.js';
import { removeContest } from '../../../api/contest.js';

class ContestDelete extends React.Component {

    handleClose = () => {
        this.props.dispatch(closeForm());
    };

    handleRemove = () => {
        return removeContest(this.props.contest).then(result => {
            this.props.dispatch(contestDeleteSuccess(result));
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
                    title="Удаление опроса"
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                    >
                    Вы действительно хотите удалить опрос?
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        contestFormOpen: store.ContestDeleteState.open,
        contest: store.ContestDeleteState.contest
    };
};

export default connect(mapStateToProps)(ContestDelete);
