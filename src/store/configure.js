import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from './reducers';
import rootSaga from "./sagas";

import middlewares, { sagaMiddleware } from './middlewares';

const composeEnhancer = composeWithDevTools || compose;

export default (initialState = {}) => {

    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancer(applyMiddleware(...middlewares))
    );

    sagaMiddleware.run(rootSaga);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(require('./reducers/index').default);
        });
    }

    return store;

};