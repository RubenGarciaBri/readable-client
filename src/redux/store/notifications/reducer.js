import initialState from './initialState';

import { MARK_NOTIFICATIONS_READ } from './types';

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MARK_NOTIFICATIONS_READ:
      // TODO: Improve this, doesn't look immutable
      state.notifications.forEach(notif => (notif.read = true));

      return {
        ...state,
      };

    default:
      return state;
  }
};

export default notificationsReducer;
