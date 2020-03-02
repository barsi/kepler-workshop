import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
// import App from '../App';

const Root = ({ store, history, app }) => (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={app} />
        </Router>
    </Provider>
);

export default Root;
