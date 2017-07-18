import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './App.jsx';
import ContestsPage from './blocks/ContestsPage/ContestsPage.jsx';
import QuestionsPage from './blocks/QuestionsPage/QuestionsPage.jsx';
import AnswersPage from './blocks/AnswersPage/AnswersPage.jsx';
import ClientGroupsPage from './blocks/ClientGroupsPage/ClientGroupsPage.jsx';
import ClientsPage from './blocks/ClientsPage/ClientsPage.jsx';
import { setCurrentRoute } from './actions/GlobalActions.js';
import store from './Store.js';

export default React.createClass({
    render() {
        return (
            <Router history={hashHistory} >
                <Route path="/"
                    component={App}
                    onChange={({ params }) => store.dispatch(setCurrentRoute({}))}
                    >
                    <IndexRoute component={ContestsPage} />
                    <Route path="/contests"
                        component={ContestsPage}
                        />
                    <Route path="/contests/:id"
                        component={QuestionsPage}
                        onEnter={({ params }) => store.dispatch(setCurrentRoute(params))}
                        />
                    <Route path="/questions/:id"
                        component={AnswersPage}
                        onEnter={({ params }) => store.dispatch(setCurrentRoute(params))}
                        />
                    <Route path="/client-groups"
                        component={ClientGroupsPage}
                        />
                    <Route path="/client-groups/:id"
                        component={ClientsPage}
                        onEnter={({ params }) => store.dispatch(setCurrentRoute(params))}
                        />
                    <Route path="/clients" component={ClientsPage} />
                </Route>
            </Router>
        );
    }
});
