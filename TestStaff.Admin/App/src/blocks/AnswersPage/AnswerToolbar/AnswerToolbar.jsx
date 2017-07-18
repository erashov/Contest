import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Link } from 'react-router';
import ActionHome from 'material-ui/svg-icons/navigation/arrow-back';
import { answerPageOpen } from '../../../actions/AnswerActions.js';
import { connect } from 'react-redux';
import { getQuestions } from '../../../api/question.js';
import { openForm } from '../../../actions/AnswerFormActions.js';
import { setCurrentRoute } from '../../../actions/GlobalActions.js';

class AnswersToolbar extends React.Component {
    openFormHandler = () => {
        this.props.dispatch(openForm());
    };

    loadQuestion = () => {
        return getQuestions({
            id: this.props.questionId
        }).then(result => {
            this.props.dispatch(answerPageOpen(result));
            // this.props.dispatch(globalLoaderShow(false));
            return result;
        }).catch(() => {
            // this.props.dispatch(globalLoaderShow(false));
        });
    };

    componentWillMount() {
        this.loadQuestion();
    }

    handleBackClick = () => {
        setTimeout(() => {
            this.props.dispatch(setCurrentRoute({ id: this.props.currentCategory.ParentId }));
        }, 1);
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
                    {/*<Link to={`/contests/${this.props.question.ContestId}`}> */}
                    <Link to={`/contests`}>
                        <ActionHome
                            style={this.large}
                            hoverColor="rgba(0, 0, 0, 0.8)"
                            onTouchTap={this.handleBackClick}
                            />
                    </Link>
                    <ToolbarTitle text={`Ответы на вопрос - ${this.props.question.Text}`} />
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarSeparator />
                    <RaisedButton label="Добавить ответ" primary={true} onTouchTap={this.openFormHandler} />
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        questionId: store.GlobalState.currentRoute.id,
        question: store.AnswerState.question,
        currentCategory: store.ContestState.currentCategory,
    };
};

export default connect(mapStateToProps)(AnswersToolbar);
