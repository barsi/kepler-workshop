import React from 'react';
import document from 'global/document';
import { render } from 'react-dom';
import store from './store';
import App from './App';
import Root from './router/routes';
import history from './history';

import * as serviceWorker from './serviceWorker';


// const appRoute = buildAppRoutes(App);

// const Root = () => (
//     <Provider store={store}>
//         <BrowserRouter>
//             <Route path="/" component={App}>
//                 {appRoute}
//             </Route>
//         </BrowserRouter>
//     </Provider>
// );

render(<Root store={store} history={history} app={App} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
