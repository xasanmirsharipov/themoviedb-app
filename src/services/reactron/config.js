if (process.env.NODE_ENV !== 'production') {
	const Reactotron = require('reactotron-react-js').default;
	const { trackGlobalErrors } = require('reactotron-react-js');
	const { reactotronRedux } = require('reactotron-redux');
	const sagaPlugin = require('reactotron-redux-saga');

	Reactotron.configure({ name: 'ReactQWERTY', secure: false })
		.use(reactotronRedux())
		.use(trackGlobalErrors({ offline: false }))
		.use(sagaPlugin())
		.connect();

	// Reactotron.clear()

	console.tron = Reactotron
}
