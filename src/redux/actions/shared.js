import { getInitialData } from '../../utils/api';
import { receiveUsers } from './users';
import { receivePosts } from './posts';

export const handleInitialData = () => (dispatch) => {
  return getInitialData().then(({ users, authedUser, posts }) => {
    // Default user log in for development purposes

    // dispatch(setAuthedUser())
    // dispatch(receiveUsers(users));
    // dispatch(receivePosts(posts));
  });
};
