import {
  _getUsers,
  _getPosts,
  _savePost,
  _saveComment
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getPosts(),
  ]).then(([users, posts]) => ({
    users,
    posts,
  }))
}


export function savePost (info) {
  return _savePost(info)
}

export function saveComment (info) {
  return _saveComment(info)
}