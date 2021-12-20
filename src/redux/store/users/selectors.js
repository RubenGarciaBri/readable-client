import { createSelector } from 'reselect';

const getAllUserIds = state => {
  return state.users.allIds;
};

const getUserById = (state, stateId) => {
  return state.users.byId[stateId];
};

const getUserLoading = state => {
  return state.users.loading;
};

const getUserError = state => {
  return state.users.error;
};

export const getAllUserIdsSelector = () =>
  createSelector(
    state => getAllUserIds(state),
    allIds => allIds
  );

export const getUserByIdSelector = stateId =>
  createSelector(
    state => getUserById(state, stateId),
    user => user
  );

export const getUserLoadingSelector = () =>
  createSelector(
    state => getUserLoading(state),
    loading => loading
  );

export const getUserErrorSelector = () =>
  createSelector(
    state => getUserError(state),
    error => error
  );
