import { createSelector } from 'reselect';

const getAllCommentIds = state => {
  return state.comments.allIds;
};

const getCommentById = (state, stateId) => {
  return state.comments.byId[stateId];
};

const getCommentLoading = state => {
  return state.comments.loading;
};

const getCommentError = state => {
  return state.comments.error;
};

export const getAllCommentIdsSelector = () =>
  createSelector(
    state => getAllCommentIds(state),
    allIds => allIds
  );

export const getCommentByIdSelector = stateId =>
  createSelector(
    state => getCommentById(state, stateId),
    comment => comment
  );

export const getCommentLoadingSelector = () =>
  createSelector(
    state => getCommentLoading(state),
    loading => loading
  );

export const getCommentErrorSelector = () =>
  createSelector(
    state => getCommentError(state),
    error => error
  );
