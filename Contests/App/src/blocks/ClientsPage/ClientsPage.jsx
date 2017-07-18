import React from 'react';
import ClientsTable from './ClientsTable/ClientsTable.jsx';
import ClientToolbar from './ClientToolbar/ClientToolbar.jsx';
import ClientForm from './ClientForm/ClientForm.jsx';
import ClientDelete from './ClientDelete/ClientDelete.jsx';
import ManageGroup from './ManageGroup/ManageGroup.jsx';
import { connect } from 'react-redux';

class ClientsPage extends React.Component {
    render() {
        const groupManage = this.props.currentRoute && !!this.props.currentRoute.id;

        return (
            <div className="clients-page">
                <ClientToolbar groupManage={groupManage} />
                <ClientsTable groupManage={groupManage} />
                <ClientForm open={this.props.formOpen} groupManage={groupManage} />
                <ClientDelete open={this.props.deleteOpen} groupManage={groupManage} />
                <ManageGroup open={this.props.manageGroupFormOpen.open} />
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        formOpen: store.ClientFormState.open,
        deleteOpen: store.ClientDeleteState.open,
        manageGroupFormOpen: store.ManageGroupState.formOpen,
        currentRoute: store.GlobalState.currentRoute
    };
};

export default connect(mapStateToProps)(ClientsPage);
