import {
  LOADING_POSTS,
  SET_POSTS,
  SET_ERROR,
  CLEAR_ERROR,
  POST_POST,
  SET_POST,
  FAV_POST,
  UNFAV_POST,
  TOGGLE_POST_DOWNVOTE,
  TOGGLE_POST_UPVOTE,
  DELETE_POST,
} from './types';

import axios from 'axios';

export const getPosts = () => dispatch => {
  axios
    .get('/posts')
    .then(res => {
      dispatch({
        type: SET_POSTS,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_POSTS,
        payload: [],
      });
    });
};

export const getPost = postId => dispatch => {
  axios
    .get(`/post/${postId}`)
    .then(res => {
      dispatch({
        type: SET_POST,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

export const postPost = newPost => dispatch => {
  axios
    .post('/post', newPost)
    .then(res => {
      dispatch({
        type: POST_POST,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERROR });
    })
    .catch(err => {
      // TODO: Fix later, currently an empty object because of frozen UI issue
      dispatch({
        type: SET_ERROR,
        payload: {},
      });
    });
};

export const favPost = postId => dispatch => {
  axios
    .post(`/post/${postId}/fav`)
    .then(res => {
      dispatch({
        type: FAV_POST,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

export const unfavPost = postId => dispatch => {
  axios
    .post(`/post/${postId}/unfav`)
    .then(res => {
      dispatch({
        type: UNFAV_POST,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

export const togglePostUpvote = postId => dispatch => {
  axios
    .post(`/post/${postId}/togglePostUpvote`)
    .then(res => {
      dispatch({
        type: TOGGLE_POST_UPVOTE,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

export const togglePostDownvote = postId => dispatch => {
  axios
    .post(`/post/${postId}/togglePostDownvote`)
    .then(res => {
      dispatch({
        type: TOGGLE_POST_DOWNVOTE,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

export const deletePost = postId => dispatch => {
  axios
    .delete(`/post/${postId}`)
    .then(() => {
      dispatch({
        type: DELETE_POST,
        payload: {
          postId,
        },
      });
    })
    .catch(err => console.log(err));
};
