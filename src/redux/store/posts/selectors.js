import { createSelector } from 'reselect';
import { nestedIdObjectToArray } from '../../../utils/helpers';

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

const getFilteredPostIds = (state, category) => {
  const postsArray = nestedIdObjectToArray(state.posts.byId);
  const filteredPostsArray = postsArray.filter(
    post => post.category === category
  );
  return filteredPostsArray.map(post => post.id);
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

export const getFilteredPostIdsSelector = category =>
  createSelector(
    state => getFilteredPostIds(state, category),
    postIds => postIds
  );
