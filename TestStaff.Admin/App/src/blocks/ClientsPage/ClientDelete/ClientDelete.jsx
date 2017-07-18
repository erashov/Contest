import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { clientDeleteSuccess } from '../../../actions/ClientActions.js';
import { removeClient } from '../../../api/client.js';
import { closeForm } from '../../../actions/ClientDeleteActions.js';

class ClientDelete extends React.Component {

    handleClose = () => {
        this.props.dispatch(closeForm());
    };

    handleRemove = () => {
        return removeClient(this.props.client).then(result => {
            this.props.dispatch(clientDeleteSuccess(result));
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
                    title="Удаление клиента"
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                    >
                    Вы действительно хотите удалить клиента?
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        client: store.ClientDeleteState.client
    };
};

export default connect(mapStateToProps)(ClientDelete);
