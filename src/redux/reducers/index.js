import { combineReducers } from 'redux';
import user from './user';
import data from './data';
import UI from './UI';

export default combineReducers({
  user,
  data,
  UI,
});
