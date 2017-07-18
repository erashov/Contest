import React from 'react';
import ClientGroupsTable from './ClientGroupsTable/ClientGroupsTable.jsx';
import ClientGroupsToolbar from './ClientGroupsToolbar/ClientGroupsToolbar.jsx';
import ClientGroupsForm from './ClientGroupsForm/ClientGroupsForm.jsx';
import ClientGroupsDelete from './ClientGroupsDelete/ClientGroupsDelete.jsx';
import { connect } from 'react-redux';

class ClientGroupsPage extends React.Component {
    render() {
        return (
            <div className="client-groups-page">
                <ClientGroupsToolbar />
                <ClientGroupsTable />
                <ClientGroupsForm open={this.props.formOpen} />
                <ClientGroupsDelete open={this.props.deleteOpen} />
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        formOpen: store.ClientGroupFormState.open,
        deleteOpen: store.ClientGroupDeleteState.open
    };
};

export default connect(mapStateToProps)(ClientGroupsPage);
