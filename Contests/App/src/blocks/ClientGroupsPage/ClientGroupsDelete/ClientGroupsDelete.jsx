import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { clientGroupsDeleteSuccess } from '../../../actions/ClientGroupsActions.js';
import { removeClientGroup } from '../../../api/clientGroup.js';
import { closeForm } from '../../../actions/ClientGroupsDeleteActions.js';

class ClientGroupsDelete extends React.Component {

    handleClose = () => {
        this.props.dispatch(closeForm());
    };

    handleRemove = () => {
        return removeClientGroup(this.props.clientGroup).then(result => {
            this.props.dispatch(clientGroupsDeleteSuccess(result));
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
                />,
        ];

        return (
            <div>
                <Dialog
                    title="Удаление группы"
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                    >
                    Вы действительно хотите удалить группу?
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        clientGroup: store.ClientGroupDeleteState.clientGroup
    };
};

export default connect(mapStateToProps)(ClientGroupsDelete);
