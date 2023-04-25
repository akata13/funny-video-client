/* eslint-disable consistent-return */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import { SubmissionError } from 'redux-form';
import { toast } from 'react-toastify';
import { isString, mapValues, map, isArray } from 'lodash';

import * as authActions from './auth';
// import * as commonActions from "./common";

const handleError = (store) => (err) => {
  // handle object error
  if (err.errors) {
    // check state if a redux-form is submitting state
    const formState = store.getState().form;
    for (const key in formState) {
      const form = formState[key];
      if (form.submitting) {
        const submissionError = mapValues(err.errors, (error) =>
          isArray(error) ? error.join('.') : error
        );
        throw new SubmissionError(submissionError);
      }
    }
    // convert to string message
    const stringMessage = map(err.errors, (error) => error).join(',');
    toast.error(stringMessage);
    return false;
  }
  if (err.error === 'LOGIN_REQUIRED') {
    toast.error(err.message);
    store.dispatch(authActions.logout());
    return false;
  }
  // handle string error
  if (err.message && isString(err.message)) {
    // store.dispatch(commonActions.showError(true));

    toast.error(err.message);
    return false;
  }
};

const applyErrorHandler =
  (fn, store) =>
  (...args) => {
    const promise = fn(...args);
    if (promise instanceof Promise) {
      return promise.catch(handleError(store));
    }
    return promise;
  };

export const handleGlobalError = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return next(applyErrorHandler(action, store));
  }
  return next(action);
};
