import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { connect } from 'react-redux';
import { openForm } from '../../../actions/ClientGroupsFormActions.js';

class ClientGroupsToolbar extends React.Component {
    openFormHandler = () => {
        this.props.dispatch(openForm());
    };

    render() {
        return (
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarTitle text="Список групп" />
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarSeparator />
                    <RaisedButton label="Создать группу" primary={true} onTouchTap={this.openFormHandler} />
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

const mapStateToProps = function (store) {
    return {};
};

export default connect(mapStateToProps)(ClientGroupsToolbar);
