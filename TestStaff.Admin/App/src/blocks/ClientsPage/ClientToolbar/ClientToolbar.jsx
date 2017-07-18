import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { clientPageOpen } from '../../../actions/ClientActions.js';
import { openForm } from '../../../actions/ClientFormActions.js';
import { formOpen as manageGroupFormOpen } from '../../../actions/ManageGroupActions.js';
import { connect } from 'react-redux';
import { getClientGroups } from '../../../api/clientGroup.js';
import ActionHome from 'material-ui/svg-icons/navigation/arrow-back';
import { Link } from 'react-router';

class ClientToolbar extends React.Component {
    addClientHandler = () => {
        this.props.dispatch(openForm());
    };

    addClientToGroupHandler = () => {
        this.props.dispatch(manageGroupFormOpen(
            { open: true }, this.props.currentRoute.id, this.props.group.Name
        ));
    };

    loadClientGroup = () => {
        return getClientGroups({
            id: this.props.currentRoute.id
        }).then(result => {
            this.props.dispatch(clientPageOpen(result));
            // this.props.dispatch(globalLoaderShow(false));
            return result;
        }).catch(() => {
            // this.props.dispatch(globalLoaderShow(false));
        });
    };

    large = {
        marginTop: 10,
        marginRight: 10,
        width: 36,
        height: 36,
        color: 'rgba(0, 0, 0, 0.4)'
    }

    hoverColor = 'rgba(0, 0, 0, 0.8)';

    componentWillMount() {
        if (this.props.groupManage) {
            this.loadClientGroup();
        }
    }

    render() {
        const groupManage = this.props.groupManage;
        const title = groupManage ? `Состав группы - ${this.props.group.Name}` : 'Список клиентов';
        return (
            <Toolbar>
                <ToolbarGroup>
                    {
                        groupManage ?
                            <Link to={`/client-groups`}>
                                <ActionHome
                                    style={this.large}
                                    hoverColor={this.hoverColor}
                                    />
                            </Link> : ''
                    }
                    <ToolbarTitle text={title} />
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarSeparator />
                    {
                        groupManage ?
                            <RaisedButton
                                label="Изменить состав"
                                primary={true}
                                onTouchTap={this.addClientToGroupHandler}
                                /> :
                            <RaisedButton
                                label="Создать клиента"
                                primary={true}
                                onTouchTap={this.addClientHandler}
                                />
                    }
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        currentRoute: store.GlobalState.currentRoute,
        group: store.ClientState.group
    };
};

export default connect(mapStateToProps)(ClientToolbar);
