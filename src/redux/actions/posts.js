import { savePost, saveComment } from "../../utils/api"
import axios from 'axios'
import { toast } from 'react-toastify'

// New Imports
import {
  SET_POSTS,
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
  RECEIVE_POSTS,
  ADD_COMMENT,
  ADD_POST,
  TOGGLE_FAV
} from '../types';

const options = {
  headers: {
    'Authorization': 'mytoken',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// New Functions

// Get all posts
export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/posts')
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_POSTS,
        payload: []
      });
    });
};
export const getPost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/post/${postId}`)
    .then((res) => {
      dispatch({
        type: SET_POST,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
// Post a scream
export const postPost = (newPost) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/post', newPost)
    .then((res) => {
      dispatch({
        type: POST_POST,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// Like a scream
export const favPost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/fav`)
    .then((res) => {
      dispatch({
        type: FAV_POST,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Unlike a scream
export const unfavPost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/unfav`)
    .then((res) => {
      dispatch({
        type: UNFAV_POST,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Submit a comment
export const submitComment = (postId, commentData) => (dispatch) => {
  axios
    .post(`/post/${postId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
export const deletePost= (postId) => (dispatch) => {
  axios
    .delete(`/post/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userName) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userName}`)
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data.posts
      });
    })
    .catch(() => {
      dispatch({
        type: SET_POSTS,
        payload: null
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};




// Old functions
export function handleAddPost (title, body, category) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    return savePost({
      title,
      body,
      category,
      author: authedUser.id,
    })
    .then((post) => {
      dispatch(addPost(post))

      axios.post('http://localhost:3001/posts', post, options);     
    })
  }
}


export function handleAddComment (comment, postId) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    return saveComment({
      comment,
      postId,
      author: authedUser.id,
    })
    .then((comment) => dispatch(addComment(comment)))
  }
}


// export function handleToggleUpvote (id) {
//   return (dispatch, getState) => {
//     const { authedUser } = getState()

//     dispatch(toggleUpvote(id, authedUser))
//   }
// }


// export function handleToggleDownvote (id) {
//   return (dispatch, getState) => {
//     const { authedUser } = getState()

//     dispatch(toggleDownvote(id, authedUser))
//   }
// }


// export function handleToggleFav (postId) {
//   return (dispatch, getState) => {
//     const { authedUser } = getState()

//     dispatch(toggleFav(postId, authedUser))
//   }
// }


// function toggleFav(postId, authedUser) {
//   return {
//     type: TOGGLE_FAV,
//     payload: {
//       postId,
//       authedUser
//     }  
//   }
// }


export function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    payload: {
      posts
    }
  }
}

function addPost (post) {
  return {
    type: ADD_POST,
    payload: {
      post
    }
  }
}


function addComment (comment) {
  return {
    type: ADD_COMMENT,
    payload: {
      comment
    }
  }
}


// function toggleUpvote (id, authedUser) {
//   return {
//     type: TOGGLE_UPVOTE,
//     payload: {
//       id,
//       authedUser
//     }
//   }
// }


// function toggleDownvote (id, authedUser) {
//   return {
//     type: TOGGLE_DOWNVOTE,
//     payload: {
//       id,
//       authedUser
//     }
//   }
// }