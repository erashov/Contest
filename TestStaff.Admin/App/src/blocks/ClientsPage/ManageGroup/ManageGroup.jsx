import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
    from 'material-ui/Table';
import { connect } from 'react-redux';
import {
    formOpen,
    clientsInGroupLoadSuccess,
    allClientsLoadSuccess,
    addClientsToGroup,
    removeClientsFromGroup,
    saveGroupSuccess
} from '../../../actions/ManageGroupActions.js';
import { getClients } from '../../../api/client.js';
import { editClientGroup } from '../../../api/clientGroup.js';
import appConfig from '../../../../appConfig.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import './ManageGroup.sass';
import { clientInGroupLoadSuccess } from '../../../actions/ClientActions.js';
import { processCheckbox } from '../../../helper/helper.js';

class ManageGroup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: true,
            selectable: true,
            multiSelectable: true,
            enableSelectAll: true,
            deselectOnClickaway: true,
            showCheckboxes: true,
            height: '100%'
        };
    }

    clientsInGroupBackup = [];
    allClientsBackup = [];

    handleClose = () => {
        this.props.dispatch(formOpen({ open: false }));
        this.props.dispatch(clientsInGroupLoadSuccess(this.clientsInGroupBackup));
        this.props.dispatch(allClientsLoadSuccess(this.allClientsBackup));
    };

    handleCancel = () => {
        this.props.dispatch(formOpen({ open: false }));
    };

    handleSave = () => {
        return editClientGroup({
            Id: this.props.id,
            Name: this.props.name,
            Employees: this.props.clientsInGroup
        }).then(result => {
            this.props.dispatch(saveGroupSuccess(result));
            this.props.dispatch(clientInGroupLoadSuccess({ Records: this.props.clientsInGroup }));
            // this.props.dispatch(globalLoaderShow(false));
            this.handleCancel();
            return result;
        });
    };

    removeFromGroupHandler = item => {
        let records = this.props.clientsInGroup.filter(item => item.selected);
        this.props.dispatch(removeClientsFromGroup(records));
    };

    addToGroupHandler = item => {
        let records = this.props.allClients.filter(item => item.selected);
        this.props.dispatch(addClientsToGroup(records));
    };

    onRowSelectionHandler = processCheckbox;

    getData = () => {
        if (this.props.currentRoute) {
            this.getClientsInGroup()
                .then(this.getAllClients);
        }
    };

    getClientsInGroup = () => {
        return new Promise((resolve, reject) => {
            const groupId = this.props.currentRoute.id;
            getClients({
                page: appConfig.page,
                count: appConfig.count,
                groupId: groupId
            }).then(result => {
                this.clientsInGroupBackup = result;
                this.props.dispatch(clientsInGroupLoadSuccess(result));
                // this.props.dispatch(globalLoaderShow(false));
                resolve(result);
            });
        });
    };

    getAllClients = () => {
        return new Promise((resolve, reject) => {
            getClients({
                page: appConfig.page,
                count: appConfig.count
            }).then(result => {
                this.allClientsBackup = result;
                this.props.dispatch(allClientsLoadSuccess(result));
                // this.props.dispatch(globalLoaderShow(false));
                resolve(result);
            });
        });
    };

    getTable(settings) {
        const table = <Table
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
            onRowSelection={settings.onRowSelectionHandler.bind(this, settings.data)}
            >
            <TableHeader
                displaySelectAll={this.state.showCheckboxes}
                adjustForCheckbox={this.state.showCheckboxes}
                enableSelectAll={this.state.enableSelectAll}
                >
                <TableRow>
                    <TableHeaderColumn>{settings.title}</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={this.state.showCheckboxes}
                deselectOnClickaway={this.state.deselectOnClickaway}
                showRowHover={this.state.showRowHover}
                stripedRows={this.state.stripedRows}
                >
                {
                    settings.data.map((item, index) => (
                        <TableRow key={item.Id}>
                            <TableRowColumn>{item.Name}({item.Email})</TableRowColumn>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>;

        return table;
    }

    componentWillMount() {
        this.getData();
    }

    render() {
        const actions = [
            <FlatButton
                label="Отмена"
                primary={true}
                onTouchTap={this.handleClose}
                />,
            <FlatButton
                label="Сохранить"
                primary={true}
                onTouchTap={this.handleSave}
                />
        ];

        return (
            <div>
                <Dialog
                    title="Изменить состав группы"
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                    >
                    <div className="manage-group__layout">
                        <div className="manage-group__left-col">
                            {
                                this.getTable({
                                    data: this.props.clientsInGroup,
                                    onRowSelectionHandler: this.onRowSelectionHandler,
                                    title: 'Клиенты в группе'
                                })
                            }
                        </div>
                        <div className="manage-group__center-col">
                            <div className="manage-group__manage-buttons-outer">
                                <div className="manage-group__manage-buttons-inner">
                                    <div className="manage-group__add-to-group">
                                        <FloatingActionButton
                                            mini={true}
                                            onTouchTap={this.removeFromGroupHandler}
                                            >
                                            <ArrowForward />
                                        </FloatingActionButton>
                                    </div>
                                    <div className="manage-group__remove-from-group">
                                        <FloatingActionButton
                                            mini={true}
                                            onTouchTap={this.addToGroupHandler}
                                            >
                                            <ArrowBack />
                                        </FloatingActionButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="manage-group__right-col">
                            {
                                this.getTable({
                                    data: this.props.allClients,
                                    onRowSelectionHandler: this.onRowSelectionHandler,
                                    title: 'Все клиенты'
                                })
                            }
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        formOpen: store.ManageGroupState.formOpen,
        id: store.ManageGroupState.id,
        name: store.ManageGroupState.name,
        clientsInGroup: store.ManageGroupState.clientsInGroup,
        allClients: store.ManageGroupState.allClients,
        currentRoute: store.GlobalState.currentRoute
    };
};

export default connect(mapStateToProps)(ManageGroup);
