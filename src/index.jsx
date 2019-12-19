import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { getStore } from './store.js';
import Global from './pages/global';
import RenderRouter from './router';
import './main.scss';

const requireAll = requireContext => requireContext
    .keys()
    .map(requireContext);
const req = require.context('./icons', false, /\.svg$/);
requireAll(req);

import __API__ from './config.js';
window.__API__ = __API__;

// if (module.hot) {
//     module
//         .hot
//         .accept()
// }

const store = getStore();
ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <div>
                <Global />
                <Switch>
                    {RenderRouter(store)}
                </Switch>
            </div>
        </HashRouter>
    </Provider>, document.getElementById('root'));
