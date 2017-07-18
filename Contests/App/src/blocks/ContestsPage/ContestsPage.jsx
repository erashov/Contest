import React from 'react';
import ContestTable from './ContestTable/ContestTable.jsx';
import ContestToolbar from './ContestToolbar/ContestToolbar.jsx';
import ContestForm from './ContestForm/ContestForm.jsx';
import ContestDelete from './ContestDelete/ContestDelete.jsx';
import { connect } from 'react-redux';

class ContestsPage extends React.Component {
    render() {
        return (
            <div className="contests-page">
                <ContestToolbar />
                <ContestTable />
                <ContestForm open={this.props.contestFormOpen} />
                <ContestDelete open={this.props.contestDeleteOpen} />
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        contestFormOpen: store.ContestFormState.open,
        contestDeleteOpen: store.ContestDeleteState.open
    };
};

export default connect(mapStateToProps)(ContestsPage);
