require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import configureStore from '../common/store/configureStore';
import routes from '../common/routes';

import '../../styles/index.css';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>,
  rootElement
);
