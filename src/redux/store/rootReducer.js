import { combineReducers } from 'redux';
import authedUserReducer from './authedUser/reducer';
import commentsReducer from './comments/reducer';
import notificationsReducer from './notifications/reducer';
import postsReducer from './posts/reducer';
import usersReducer from './users/reducer';

const rootReducer = combineReducers({
  authedUser: authedUserReducer,
  comments: commentsReducer,
  notifications: notificationsReducer,
  posts: postsReducer,
  users: usersReducer,
});

export default rootReducer;
