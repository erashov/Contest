import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
    from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentEdit from 'material-ui/svg-icons/content/create';
import ContentClear from 'material-ui/svg-icons/content/clear';
import { connect } from 'react-redux';
import { clientLoadSuccess, clientInGroupLoadSuccess } from '../../../actions/ClientActions.js';
import { getClients } from '../../../api/client.js';
import appConfig from '../../../../appConfig.js';
import { openForm as openForm } from '../../../actions/ClientFormActions.js';
import { openForm as deleteOpenForm } from '../../../actions/ClientDeleteActions.js';

const colStyle = {
    overflow: 'hidden'
};

const colWidth = {
    width: '2rem',
    overflow: 'hidden'
};

const colButtonWidth = {
    width: '6rem',
    overflow: 'hidden'
};

const contentClearStyle = {
    marginLeft: '1rem'
};

class ClientsTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: true,
            selectable: false,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '100%'
        };
    }

    openFormHandler = item => {
        this.props.dispatch(openForm(item));
    };

    openFormDeleteHandler = item => {
        this.props.dispatch(deleteOpenForm(item));
    };

    getData = () => {
        const groupId = this.props.groupManage ? this.props.currentRoute.id : null;

        return getClients({
            page: appConfig.page,
            count: appConfig.count,
            groupId: groupId
        }).then(result => {
            if (groupId) {
                this.props.dispatch(clientInGroupLoadSuccess(result));
            } else {
                this.props.dispatch(clientLoadSuccess(result));
            }

            // this.props.dispatch(globalLoaderShow(false));
            return result;
        }).catch(() => {
            // this.props.dispatch(globalLoaderShow(false));
        });
    };

    componentWillMount() {
        this.getData();
    }

    render() {
        const groupManage = this.props.groupManage;
        const list = groupManage ? this.props.clientsInGroup : this.props.clients;

        return (
            <div>
                <Table
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                    >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                        >
                        <TableRow>
                            <TableHeaderColumn style={colWidth}>ID</TableHeaderColumn>
                            <TableHeaderColumn>Название/Имя</TableHeaderColumn>
                            <TableHeaderColumn>Email</TableHeaderColumn>
                            <TableHeaderColumn style={colButtonWidth}></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                        >
                        {
                            list.map(item => (
                                <TableRow key={item.Id}>
                                    <TableRowColumn style={colWidth}>{item.Id}</TableRowColumn>
                                    <TableRowColumn style={colStyle}>
                                        {item.Name}
                                    </TableRowColumn>
                                    <TableRowColumn style={colStyle}>
                                        {item.Email}
                                    </TableRowColumn>
                                    <TableRowColumn style={colButtonWidth}>
                                        {
                                            groupManage ? '' :
                                                <div>
                                                    <FloatingActionButton mini={true}
                                                        onTouchTap={this.openFormHandler.bind(null, item)}>
                                                        <ContentEdit />
                                                    </FloatingActionButton>
                                                    <FloatingActionButton
                                                        mini={true}
                                                        onTouchTap={this.openFormDeleteHandler.bind(null, item)}
                                                        style={contentClearStyle}>
                                                        <ContentClear />
                                                    </FloatingActionButton>
                                                </div>
                                        }
                                    </TableRowColumn>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        clients: store.ClientState.clients,
        clientsInGroup: store.ClientState.clientsInGroup,
        currentRoute: store.GlobalState.currentRoute
    };
};

export default connect(mapStateToProps)(ClientsTable);
