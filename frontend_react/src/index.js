import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
//import { Route } from 'react-router';
//import { Route } from 'react-router-dom';

import { BrowserRouter as Router, Route } from  'react-router-dom';

import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import Immutable from 'immutable';
import createSagaMiddleware from 'redux-saga';

import registerServiceWorker from './registerServiceWorker';

import reducer from './reducers';
import sagas from './sagas';
import App from './components/App';
import Dashboard from './components/Dashboard';
import InterviewPlanList from './containers/interviewPlanList';
import Questions from './containers/questions';
import Menu from './components/Menu';


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

    <Router>
      <div>
      <Menu />
        <Route path="/" exact component={App} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/questions" component={Questions} />
        <Route path="/interviewPlanList" component={InterviewPlanList} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();

