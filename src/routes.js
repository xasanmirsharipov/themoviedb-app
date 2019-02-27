import React from 'react';
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "react-router-redux";
import { history } from 'store';

import App from "./App";

import Home from "./pages/Home";
import News from "./pages/News";

const routes = [
	{ path: '/', exact: true, component: Home },
	{ path: '/news', exact: true, component: News },
];

export default ({ store }) => {

	return (
		<ConnectedRouter history={history} store={store}>
			<App>
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
			</App>
		</ConnectedRouter>
	);
};