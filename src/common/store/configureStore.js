import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promiseMiddleware from '../api/promiseMiddleware';
import rootReducer from '../reducers';

const middlewareBuilder = () => {
  let universalMiddleware = [thunk, promiseMiddleware];
  let middleware;

  if (process.browser && process.env.NODE_ENV !== 'production') {
    middleware = applyMiddleware(...universalMiddleware, createLogger());
  } else {
    middleware = applyMiddleware(...universalMiddleware);
  }

  return [middleware];

};

const finalCreateStore = compose(...middlewareBuilder())(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
