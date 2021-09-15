import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  notifications: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };

    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach(notif => (notif.read = true));

      return {
        ...state,
      };

    default:
      return state;
  }
}
