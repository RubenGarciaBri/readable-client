import axios from 'axios';

// New Imports
import {
  SET_POSTS,
  SET_USERS,
  LOADING_DATA,
  FAV_POST,
  UNFAV_POST,
  DELETE_POST,
  SET_ERRORS,
  POST_POST,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_POST,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
  DELETE_COMMENT,
  TOGGLE_POST_UPVOTE,
  TOGGLE_POST_DOWNVOTE,
  TOGGLE_COMMENT_UPVOTE,
  TOGGLE_COMMENT_DOWNVOTE,
} from '../types';

// Get all users
export const getUsers = () => dispatch => {
  axios
    .get('/users')
    .then(res => {
      dispatch({
        type: SET_USERS,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

// Get all posts
export const getPosts = () => dispatch => {
  dispatch({ type: LOADING_DATA });
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
  dispatch({ type: LOADING_UI });
  axios
    .get(`/post/${postId}`)
    .then(res => {
      dispatch({
        type: SET_POST,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

// Post a post
export const postPost = newPost => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/post', newPost)
    .then(res => {
      dispatch({
        type: POST_POST,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Fav a post
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

// Unfav a post
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

// Toggle comment upvote
export const toggleCommentUpvote = commentId => dispatch => {
  axios
    .post(`/comment/${commentId}/toggleCommentUpvote`)
    .then(res => {
      dispatch({
        type: TOGGLE_COMMENT_UPVOTE,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

// Toggle comment downvote
export const toggleCommentDownvote = commentId => dispatch => {
  axios
    .post(`/comment/${commentId}/toggleCommentDownvote`)
    .then(res => {
      dispatch({
        type: TOGGLE_COMMENT_DOWNVOTE,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

// Toggle post upvote
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

// Toggle post downvote
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

// Submit a comment
export const submitComment = (postId, commentData) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/post/${postId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Delete a comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/post/${postId}/comment/${commentId}`)
    .then(() => {
      dispatch({
        type: DELETE_COMMENT,
        payload: {
          postId,
          commentId,
        },
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      console.log(err);
      // dispatch({
      //   type: SET_ERRORS,
      //   payload: err.response.data,
      // });
    });
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

export const getUserData = userName => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userName}`)
    .then(res => {
      dispatch({
        type: SET_POSTS,
        payload: res.data.posts,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_POSTS,
        payload: null,
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
