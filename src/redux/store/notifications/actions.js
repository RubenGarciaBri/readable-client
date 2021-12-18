import { MARK_NOTIFICATIONS_READ } from './types';

import axios from 'axios';
export const markNotificationsRead = notificationIds => dispatch => {
  axios
    .post('/notifications', notificationIds)
    .then(() => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ,
      });
    })
    .catch(err => console.log(err));
};
