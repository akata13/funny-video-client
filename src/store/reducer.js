/*
 * This file should import all substate reducers defined in feature modules,
 * to unfify and create the root reducer.
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import { reducer as auth } from './auth';
import { reducer as common } from './common';

export default combineReducers({
  routing: routerReducer,
  form,
  auth,
  common
});
