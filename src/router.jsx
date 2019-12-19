import Loadable from 'react-loadable';
import React from 'react';
import { Route } from 'react-router-dom';
import { updateReducer } from './store.js';
import CommonLoading from './pages/commonLoading';

const Loading = () => {
    return <div><CommonLoading /></div>;
};

const createRouterComponent = (store, loaderFn) => {
    return Loadable({
        loader: loaderFn,
        loading: Loading,
        render(loaded, props) {
            let Component = loaded.default;
            updateReducer(store);
            return <Component {...props} />;
        }
    });
};

const RouteWithSubRoutes = (route) => {
    return (
        <Route
            path={route.path}
            render={props => 
                <route.component {...props} routes={route.routes} />
            }
        />
    );
};

const routes = (store) => {
    return [
        {
            path: '/',
            component: createRouterComponent(store, () => import('./pages/app'))
        }
    ];
};

const renderRouter = (store) => {
    return routes(store).map((route, i) => {
        return <RouteWithSubRoutes key={i} {...route} />;
    });
};

export default renderRouter;
