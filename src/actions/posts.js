import { savePost, saveComment } from "../utils/api"
import axios from 'axios'
import { toast } from 'react-toastify'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const SEND_POST_TO_SERVER = 'SEND_POST_TO_SERVER'
export const TOGGLE_UPVOTE = 'TOGGLE_UPVOTE'
export const TOGGLE_DOWNVOTE = 'TOGGLE_DOWNVOTE'
export const ADD_COMMENT = 'ADD_COMMENT'
export const TOGGLE_FAV = 'TOGGLE_FAV'

const options = {
  headers: {
    'Authorization': 'mytoken',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};


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


export function handleToggleUpvote (id) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(toggleUpvote(id, authedUser))
  }
}


export function handleToggleDownvote (id) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(toggleDownvote(id, authedUser))
  }
}


export function handleToggleFav (postId) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(toggleFav(postId, authedUser))
  }
}


function toggleFav(postId, authedUser) {
  return {
    type: TOGGLE_FAV,
    payload: {
      postId,
      authedUser
    }  
  }
}


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


function toggleUpvote (id, authedUser) {
  return {
    type: TOGGLE_UPVOTE,
    payload: {
      id,
      authedUser
    }
  }
}


function toggleDownvote (id, authedUser) {
  return {
    type: TOGGLE_DOWNVOTE,
    payload: {
      id,
      authedUser
    }
  }
}