import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
//import { Route } from 'react-router';
//import { Route } from 'react-router-dom';

// import { BrowserRouter as Router, Route } from  'react-router-dom';

import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import Immutable from 'immutable';
import createSagaMiddleware from 'redux-saga';

import registerServiceWorker from './registerServiceWorker';

import reducer from './reducers';
import sagas from './sagas/index';
import Routes from './routes';

const logger = createLogger({
  stateTransformer: state => (Immutable.Iterable.isIterable(state) ? state.toJS() : state),
});

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware, logger, routerMiddleware(history));

const store = middleware(createStore)(reducer);

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>

    <Routes />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();

