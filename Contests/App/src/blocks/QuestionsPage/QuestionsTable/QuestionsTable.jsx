import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
    from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentEdit from 'material-ui/svg-icons/content/create';
import ContentClear from 'material-ui/svg-icons/content/clear';
import { connect } from 'react-redux';
import { questionLoadSuccess } from '../../../actions/QuestionActions.js';
import { getQuestions } from '../../../api/question.js';
import appConfig from '../../../../appConfig.js';
import { Link } from 'react-router';
import { openForm as questionOpenForm } from '../../../actions/QuestionFormActions.js';
import { openForm as questionDeleteOpenForm } from '../../../actions/QuestionDeleteActions.js';

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

class QuestionsTable extends React.Component {

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
        this.props.dispatch(questionOpenForm(item));
    };

    openFormDeleteHandler = item => {
        this.props.dispatch(questionDeleteOpenForm(item));
    };

    getData = () => {
        return getQuestions({
            contestId: this.props.contestId,
            page: appConfig.page,
            count: appConfig.count
        }).then(result => {
            this.props.dispatch(questionLoadSuccess(result));
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
                            <TableHeaderColumn>Текст</TableHeaderColumn>
                            <TableHeaderColumn style={colButtonWidth}>Тип</TableHeaderColumn>
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
                            this.props.questions.map((item) => (
                                <TableRow key={item.Id}>
                                    <TableRowColumn style={colWidth}>{item.Id}</TableRowColumn>
                                    <TableRowColumn style={colStyle}>
                                        <Link to={`/questions/${item.Id}`}>{item.Text}</Link>
                                    </TableRowColumn>
                                    <TableRowColumn style={colButtonWidth}>{item.QuestionType.Name}</TableRowColumn>
                                    <TableRowColumn style={colButtonWidth}>
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

const mapStateToProps = function (store, ownProps) {
    return {
        questions: store.QuestionState.questions,
        contestId: store.GlobalState.currentRoute.id,
    };
};

export default connect(mapStateToProps)(QuestionsTable);
