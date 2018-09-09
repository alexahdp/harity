import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import Immutable from 'immutable';
import createSagaMiddleware from 'redux-saga';

import styles from './components/assets/App.css';
import registerServiceWorker from './registerServiceWorker';

import reducer from './reducers';
import sagas from './sagas/index';
import Routes from './routes';

const logger = createLogger({
  stateTransformer: state => (Immutable.Iterable.isIterable(state) ? state.toJS() : state),
});

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const middleware = composeEnhancers(applyMiddleware(sagaMiddleware, logger, routerMiddleware(history)));

const store = middleware(createStore)(reducer);

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();

