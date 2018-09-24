import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import history from './history';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';
import configureStore from './configureStore';

const store = configureStore({}, history);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Routes />
    </Provider>,
    document.getElementById('root'),
  );
};

if (module.hot) {
  module.hot.accept(['./routes'], () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    render();
  });
}

render();
registerServiceWorker();
