import { getInitialData } from '../../utils/api';
import { setAuthedUser } from './authedUser';
import { receiveUsers } from './users';
import { receivePosts } from './posts';

const AUTHED_ID = 'Carol';
const AUTHED_AVATAR = 'https://randomuser.me/api/portraits/women/2.jpg';

export const handleInitialData = () => (dispatch) => {
  return getInitialData().then(({ users, authedUser, posts }) => {
    // Default user log in for development purposes
    dispatch(setAuthedUser(AUTHED_ID, AUTHED_AVATAR));
    // dispatch(setAuthedUser())
    dispatch(receiveUsers(users));
    dispatch(receivePosts(posts));
  });
};
