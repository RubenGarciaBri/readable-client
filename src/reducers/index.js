import { combineReducers } from 'redux'
import authedUser from './authedUser'
import users from './users'
import posts from './posts'
import notifications from './notifications'

export default combineReducers({
  authedUser,
  users,
  posts,
  notifications
})