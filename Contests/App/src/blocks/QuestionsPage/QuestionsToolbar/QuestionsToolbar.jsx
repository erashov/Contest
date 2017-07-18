import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Link } from 'react-router';
import ActionHome from 'material-ui/svg-icons/navigation/arrow-back';
import { questionPageOpen } from '../../../actions/QuestionActions.js';
import { openForm as distributionFormOpen } from '../../../actions/DistributionFormActions.js';
import { connect } from 'react-redux';
import { getContests } from '../../../api/contest.js';
import { getSetting } from '../../../api/setting.js';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import appConfig from '../../../../appConfig.js';
import { openForm } from '../../../actions/QuestionFormActions.js';

class QuestionsToolbar extends React.Component {
    createQuestionFormHandler = () => {
        this.props.dispatch(openForm());
    };

    createReportFormHandler = () => {
        window.open(`${appConfig.serverUrl}/Reporting/Index?contestId=${this.props.contestId}`);
    };

    distributeContestFormHandler = () => {
        this.props.dispatch(distributionFormOpen());
    };

    navigateToContestFormHandler = () => {
        getSetting({ key: 'TemplateContestURL' }).then(result => {
            const link = result
                .Value
                .replace('CONTEST_ID', this.props.contestId)
                .replace('EMAIL_ADDRESS', appConfig.testUser);
            window.open(link);
        });
    };

    loadContest = () => {
        return getContests({
            id: this.props.contestId
        }).then(result => {
            this.props.dispatch(questionPageOpen(result));
            // this.props.dispatch(globalLoaderShow(false));
            return result;
        }).catch(() => {
            // this.props.dispatch(globalLoaderShow(false));
        });
    };

    componentWillMount() {
        this.loadContest();
    }

    large = {
        marginTop: 10,
        marginRight: 10,
        width: 36,
        height: 36,
        color: 'rgba(0, 0, 0, 0.4)'
    }

    render() {
        return (
            <Toolbar>
                <ToolbarGroup>
                    <Link to={`/contests`}>
                        <ActionHome
                            style={this.large}
                            hoverColor="rgba(0, 0, 0, 0.8)"
                            />
                    </Link>
                    <ToolbarTitle text={`Вопросы на опрос - ${this.props.contest.Name}`} />
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarSeparator />
                    <RaisedButton label="Добавить вопрос" primary={true} onTouchTap={this.createQuestionFormHandler} />
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
                    </IconMenu>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        contestId: store.GlobalState.currentRoute.id,
        contest: store.QuestionState.contest
    };
};

export default connect(mapStateToProps)(QuestionsToolbar);
