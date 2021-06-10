import { combineReducers } from 'redux';
import authedUser from './authedUser';
import users from './users';
import posts from './posts';

export default combineReducers({
  authedUser,
  users,
  posts,
});
