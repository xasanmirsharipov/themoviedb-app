import './services/reactron/config';

import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";

import { i18n } from "services";
import { configure as configureStore } from "store";
import sentry from "./sentry";
import Routes from "./routes";

import "assets/styles/main.scss";

const store = configureStore();

const render = (Component) => {
	ReactDOM.render(
		<Provider store={store}>
			<I18nextProvider i18n={i18n()}>
				<Component { ...{ store } } />
			</I18nextProvider>
		</Provider>,
		document.getElementById('root')
	);
};

render(Routes);

if (module.hot) {
	module.hot.accept('./routes', () => {
		const NextApp = require('./routes').default;
		render(NextApp);
	});
}
sentry.init();