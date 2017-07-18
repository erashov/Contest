import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { openForm as contestOpenForm } from '../../../actions/ContestFormActions.js';
import { showTestTable, hideTestTable, setCurrentCategory } from '../../../actions/ContestActions.js';
import { connect } from 'react-redux';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ActionHome from 'material-ui/svg-icons/navigation/arrow-back';
import { getContests } from '../../../api/contest.js';
import { setCurrentRoute } from '../../../actions/GlobalActions.js';
import { openForm as questionOpenForm } from '../../../actions/QuestionFormActions.js';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import appConfig from '../../../../appConfig.js';
import { getSetting } from '../../../api/setting.js';
import { openForm as distributionFormOpen } from '../../../actions/DistributionFormActions.js';

class ContestToolbar extends React.Component {
    createReportFormHandler = () => {
        window.open(`${appConfig.serverUrl}/Reporting/Index?testId=${this.props.categoryId}`);
    };

    distributeContestFormHandler = () => {
        this.props.dispatch(distributionFormOpen());
    };

    navigateToContestFormHandler = () => {
        getSetting({ key: 'TemplateContestURL' }).then(result => {
            const link = result
                .Value
                .replace('CONTEST_ID', this.props.categoryId)
                .replace('EMAIL_ADDRESS', appConfig.testUser);
            window.open(link);
        });
    };

    createContestFormHandler = () => {
        this.props.dispatch(contestOpenForm());
    };

    isRoot = () => !this.props.categoryId;

    handleChange = (event, index, value) => {
        this.props.dispatch(this.props.isTestTable ? hideTestTable() : showTestTable());
    };

    handleBackClick = (event) => {
        const parentId = this.props.currentCategory.ParentId;
        if (parentId) {
            getContests({
                id: this.props.currentCategory.ParentId
            }).then(result => {
                this.props.dispatch(setCurrentRoute({ id: this.props.currentCategory.ParentId }));
                this.props.dispatch(setCurrentCategory(result));
                return result;
            }).catch(() => {
                // this.props.dispatch(globalLoaderShow(false));
            });
        }
        else {
            this.props.dispatch(setCurrentRoute({ id: null }));
            this.props.dispatch(setCurrentCategory(null));
        }
    };

    createQuestionFormHandler = () => {
        this.props.dispatch(questionOpenForm());
    };

    large = {
        marginTop: 10,
        marginRight: 10,
        width: 36,
        height: 36,
        color: 'rgba(0, 0, 0, 0.4)'
    };

    render() {
        const title = this.isRoot() ? 'Список тестов' : this.props.currentCategory.Name;
        const isTest = this.props.currentCategory && this.props.currentCategory.ParentId === null;

        const maybeCategoryOrQuestion = this.props.currentCategory &&
            (this.props.currentCategory.ChildTests.length === 0 &&
                this.props.currentCategory.Questions.length === 0);

        const toolbarGroup =
            <ToolbarGroup>
                <ToolbarSeparator />
                <DropDownMenu
                    value={this.props.isTestTable ? 1 : 2}
                    onChange={this.handleChange}
                    autoWidth={false}
                    disabled={!maybeCategoryOrQuestion}
                    >
                    <MenuItem value={1} primaryText="Раздел" />
                    <MenuItem value={2} primaryText="Вопрос" />
                </DropDownMenu>
                {
                    this.props.isTestTable ?
                        <RaisedButton
                            label="Создать раздел"
                            primary={true}
                            onTouchTap={this.createContestFormHandler}
                            /> :
                        <RaisedButton
                            label="Добавить вопрос"
                            primary={true}
                            onTouchTap={this.createQuestionFormHandler}
                            />
                }
                {
                    isTest ?
                        <IconMenu
                            iconButtonElement={
                                <IconButton touch={true}>
                                    <NavigationExpandMoreIcon />
                                </IconButton>
                            }
                            >
                            <MenuItem primaryText="Создать рассылку" onTouchTap={this.distributeContestFormHandler} />
                            <MenuItem primaryText="Выгрузить отчет" onTouchTap={this.createReportFormHandler} />
                            <MenuItem primaryText="Перейти к опросу" onTouchTap={this.navigateToContestFormHandler} />
                        </IconMenu> : ''
                }

            </ToolbarGroup>;

        const toolbarGroup2 =
            <ToolbarGroup>
                <ToolbarSeparator />
                <RaisedButton
                    label="Создать тест"
                    primary={true}
                    onTouchTap={this.createContestFormHandler}
                    />
            </ToolbarGroup>;

        return (
            <Toolbar>
                <ToolbarGroup>
                    {
                        !this.isRoot() ?
                            <ActionHome
                                style={this.large}
                                hoverColor="rgba(0, 0, 0, 0.8)"
                                onTouchTap={this.handleBackClick}
                                /> : ''
                    }
                    <ToolbarTitle text={title} />
                </ToolbarGroup>
                {!this.isRoot() ? toolbarGroup : toolbarGroup2}
            </Toolbar>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        isTestTable: store.ContestState.isTestTable,
        categoryId: store.GlobalState.currentId,
        currentCategory: store.ContestState.currentCategory,
        selectedItemId: store.ContestState.selectedItemId,
        contests: store.ContestState.contests,
        questions: store.QuestionState.questions,
    };
};

export default connect(mapStateToProps)(ContestToolbar);
