import React, { lazy, Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { history } from 'store';
import PropTypes from 'prop-types';

import Layout from "components/Layout";
import ScrollTop from "components/ScrollTop";

import App from "./App";

Route.propTypes.component = PropTypes.oneOfType([
	Route.propTypes.component,
	PropTypes.object,
]);

const Home = lazy(() => import("./pages/Home"));
const MovieSingle = lazy(() => import("./pages/MovieSingle"));
const MoviesList = lazy(() => import("./pages/MoviesList"));

const routes = [
	{ path: '/', exact: true, component: Home },
	{ path: '/movie/:id', exact: true, component: MovieSingle },
	{ path: '/movies/:slug', exact: true, component: MoviesList },
];

export default ({ store }) => (
	<ConnectedRouter history={history} store={store}>
		<App>
            <Layout>
				<Suspense fallback="">
					<Switch>
						{routes.map((route, key) => (
							<Route
								key={key}
								path={route.path}
								component={ScrollTop(route.component)}
								exact={route.exact}
							/>
						))}
					</Switch>
				</Suspense>
            </Layout>
		</App>
	</ConnectedRouter>
);