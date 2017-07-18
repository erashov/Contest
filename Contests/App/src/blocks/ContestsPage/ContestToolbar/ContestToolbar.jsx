import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { openForm } from '../../../actions/ContestFormActions.js';
import { connect } from 'react-redux';

class ContestToolbar extends React.Component {
    createContestFormHandler = () => {
        this.props.dispatch(openForm());
    };

    render() {
        return (
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarTitle text="Список опросов" />
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarSeparator />
                    <RaisedButton
                        label="Создать опрос"
                        primary={true}
                        onTouchTap={this.createContestFormHandler}
                        />
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

const mapStateToProps = function (store) {
    return { };
};

export default connect(mapStateToProps)(ContestToolbar);
