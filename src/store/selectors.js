import { createSelector } from 'reselect';

export const auth = (state) => state.auth;

export const getCurrentUser = createSelector(
  auth,
  (state) => state.currentUser
);

export const common = (state) => state.common;

export const getShowError = createSelector(common, (state) => state.showError);
