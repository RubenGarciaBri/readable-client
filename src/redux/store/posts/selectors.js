import { createSelector } from 'reselect';
import { nestedIdObjectToArray } from '../../../utils/helpers';

const getAllPostIds = state => {
  return state.posts.allIds;
};

const getAllPosts = state => {
  return nestedIdObjectToArray(state.posts.byId);
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

const getFilteredPosts = (state, category) => {
  const postsArray = nestedIdObjectToArray(state.posts.byId);
  return postsArray.filter(post => post.category === category);
};

export const getAllPostIdsSelector = () =>
  createSelector(
    state => getAllPostIds(state),
    allIds => allIds
  );

export const getAllPostsSelector = () =>
  createSelector(
    state => getAllPosts(state),
    posts => posts
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

export const getFilteredPostsSelector = category =>
  createSelector(
    state => getFilteredPosts(state, category),
    posts => posts
  );
