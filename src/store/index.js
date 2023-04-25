import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import persistState from 'redux-localstorage';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import { pick } from 'lodash';

import { initialState as authInitState } from './auth';

import * as middlewares from './middlewares';

import rootReducer from './reducer';

export const history = createHistory();

const initState = {};
const enhancers = [
  persistState(undefined, {
    key: process.env.REACT_APP_NAME,
    slicer: (paths) => (state) => {
      // filter which substore to persist
      const subset = {
        auth: {
          ...authInitState,
          ...pick(state.auth, 'currentUser', 'token')
        },
        common: {
          ...pick(state.common, 'showError')
        }
      };
      return subset;
    }
  })
];
const middleware = [
  middlewares.handleGlobalError,
  thunk,
  routerMiddleware(history)
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initState,
  composeEnhancers(applyMiddleware(...middleware), ...enhancers)
);

export default store;
