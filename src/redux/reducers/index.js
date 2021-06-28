import { combineReducers } from 'redux';
import user from './user';
import data from './data';
import users from './users';
import UI from './UI';

export default combineReducers({
  user,
  data,
  users,
  UI,
});
