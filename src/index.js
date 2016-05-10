import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);
const myStore = createStoreWithMiddleware(reducers,window.devToolsExtension ? window.devToolsExtension() : undefined);
ReactDOM.render(
  <Provider store={myStore}>
    <App />
  </Provider>
  , document.querySelector('.mainApp'));
