import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
// import { routerReducer, routerMiddleware } from 'react-router-redux';
import { enhanceReduxMiddleware } from 'kepler.gl/middleware';
import thunk from 'redux-thunk';
import window from 'global/window';
import history from './history';

import workshopReducer from './reducers/index';
import { connectRouter } from 'connected-react-router'


const reducers = combineReducers({
    workshop: workshopReducer,
    routing: connectRouter(history)
});

export const middlewares = enhanceReduxMiddleware([
    thunk,
    // routerMiddleware(browserHistory)
]);

export const enhancers = [applyMiddleware(...middlewares)];

const initialState = {};

//  add redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    reducers,
    initialState,
    composeEnhancers(...enhancers)
);
