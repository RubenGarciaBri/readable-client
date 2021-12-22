import {
  SUBMIT_COMMENT,
  DELETE_COMMENT,
  TOGGLE_COMMENT_UPVOTE,
  TOGGLE_COMMENT_DOWNVOTE,
  LOADING_COMMENT,
  SET_ERROR,
  CLEAR_ERROR,
} from './types';

import axios from 'axios';

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

export const submitComment = (postId, commentData) => dispatch => {
  dispatch({ type: LOADING_COMMENT });
  axios
    .post(`/post/${postId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERROR });
    })
    .catch(err => console.log(err));
};

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
      dispatch({ type: CLEAR_ERROR });
    })
    .catch(err => console.log(err));
};
