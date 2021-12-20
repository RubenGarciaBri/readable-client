import { createSelector } from 'reselect';

const getAuthedUserAuthenticated = state => {
  return state.authedUser.authenticated;
};

const getAuthedUserName = state => {
  return state.authedUser.credentials.userName;
};

const getAuthedUserLoading = state => {
  return state.authedUser.loading;
};

const getAuthedUserCredentials = state => {
  return state.authedUser.credentials;
};

const getAuthedUserError = state => {
  return state.authedUser.error;
};

export const getAuthedUserAuthenticatedSelector = () =>
  createSelector(
    state => getAuthedUserAuthenticated(state),
    authenticated => authenticated
  );

export const getAuthedUserNameSelector = () =>
  createSelector(
    state => getAuthedUserName(state),
    userName => userName
  );

export const getAuthedUserLoadingSelector = () =>
  createSelector(
    state => getAuthedUserLoading(state),
    loading => loading
  );

export const getAuthedUserCredentialsSelector = () =>
  createSelector(
    state => getAuthedUserCredentials(state),
    credentials => credentials
  );

export const getAuthedUserErrorSelector = () =>
  createSelector(
    state => getAuthedUserError(state),
    error => error
  );
