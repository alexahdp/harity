/* eslint-disable global-require */
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import Immutable from 'immutable';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import sagas from './sagas';

export default function configureStore(initialState = {}, history) {
  // Requiered for redux-devtools chrome-extention
  const composeEnhancers = process.env.NODE_ENV !== 'production'
    && typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

  const sagaMiddleware = createSagaMiddleware();

  // transform immutable state to clean js objects
  // and log into console
  const logger = createLogger({
    stateTransformer: state => (Immutable.Iterable.isIterable(state) ? state.toJS() : state),
  });

  const middlewares = applyMiddleware(sagaMiddleware, logger, routerMiddleware(history));

  const store = createStore(
    reducer,
    Immutable.fromJS(initialState),
    composeEnhancers(middlewares),
  );

  sagaMiddleware.run(sagas);

  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers.js');
      store.replaceReducer(nextRootReducer);
      store.dispatch({ type: '@@REDUCER_INJECTED' });
    });
  }

  return store;
}
