import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './Store.js';
import Router from './Router.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
    <Provider store={Store}>
        <MuiThemeProvider>
            <Router />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
