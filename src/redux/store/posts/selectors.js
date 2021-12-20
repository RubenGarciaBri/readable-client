import { createSelector } from 'reselect';

const getAllPostIds = state => {
  return state.posts.allIds;
};

const getPostById = (state, stateId) => {
  return state.posts.byId[stateId];
};

const getPostLoading = state => {
  return state.posts.loading;
};

const getPostError = state => {
  return state.posts.error;
};

export const getAllPostIdsSelector = () =>
  createSelector(
    state => getAllPostIds(state),
    allIds => allIds
  );

export const getPostByIdSelector = stateId =>
  createSelector(
    state => getPostById(state, stateId),
    post => post
  );

export const getPostLoadingSelector = () =>
  createSelector(
    state => getPostLoading(state),
    loading => loading
  );

export const getPostErrorSelector = () =>
  createSelector(
    state => getPostError(state),
    error => error
  );
