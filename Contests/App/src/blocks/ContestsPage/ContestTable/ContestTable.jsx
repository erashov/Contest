import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
    from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentEdit from 'material-ui/svg-icons/content/create';
import ContentClear from 'material-ui/svg-icons/content/clear';
import { connect } from 'react-redux';
import { contestLoadSuccess } from '../../../actions/ContestActions.js';
import { openForm as contestOpenForm } from '../../../actions/ContestFormActions.js';
import { openForm as contestDeleteOpenForm } from '../../../actions/ContestDeleteActions.js';
import { getContests } from '../../../api/contest.js';
import appConfig from '../../../../appConfig.js';
import { Link } from 'react-router';

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

class ContestTable extends React.Component {

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

    openContestFormHandler = item => {
        this.props.dispatch(contestOpenForm(item));
    };

    openContestFormDeleteHandler = item => {
        this.props.dispatch(contestDeleteOpenForm(item));
    };

    getData = () => {
        return getContests({
            page: appConfig.page,
            count: appConfig.count
        }).then(result => {
            this.props.dispatch(contestLoadSuccess(result));
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
                            <TableHeaderColumn>Название</TableHeaderColumn>
                            <TableHeaderColumn>Описание</TableHeaderColumn>
                            <TableHeaderColumn>Результат</TableHeaderColumn>
                            <TableHeaderColumn>Дата создания</TableHeaderColumn>
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
                            this.props.contests.map(item => (
                                <TableRow key={item.Id}>
                                    <TableRowColumn style={colWidth}>{item.Id}</TableRowColumn>
                                    <TableRowColumn style={colStyle}>
                                        <Link to={`/contests/${item.Id}`}>{item.Name}</Link>
                                    </TableRowColumn>
                                    <TableRowColumn style={colStyle}>{item.Description}</TableRowColumn>
                                    <TableRowColumn style={colStyle}>{item.Result}</TableRowColumn>
                                    <TableRowColumn style={colStyle}>{item.CreateDate}</TableRowColumn>
                                    <TableRowColumn style={colButtonWidth}>
                                        <FloatingActionButton mini={true}
                                            onTouchTap={this.openContestFormHandler.bind(null, item)}>
                                            <ContentEdit />
                                        </FloatingActionButton>
                                        <FloatingActionButton
                                            mini={true}
                                            onTouchTap={this.openContestFormDeleteHandler.bind(null, item)}
                                            style={contentClearStyle}>
                                            <ContentClear />
                                        </FloatingActionButton>
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
        contests: store.ContestState.contests
    };
};

export default connect(mapStateToProps)(ContestTable);
