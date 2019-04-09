import React, { lazy, Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { history } from 'store';
import PropTypes from 'prop-types';

import App from "./App";

Route.propTypes.component = PropTypes.oneOfType([
	Route.propTypes.component,
	PropTypes.object,
]);

const Home = lazy(() => import("./pages/Home"));
const News = lazy(() => import("./pages/News"));

const routes = [
	{ path: '/', exact: true, component: Home },
	{ path: '/news', exact: true, component: News },
];

export default ({ store }) => (
	<ConnectedRouter history={history} store={store}>
		<App>
			<Suspense fallback="">
				<Switch>
					{routes.map((route, key) => (
						<Route
							key={key}
							path={route.path}
							component={route.component}
							exact={route.exact}
						/>
					))}
				</Switch>
			</Suspense>
		</App>
	</ConnectedRouter>
);