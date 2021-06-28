import { SET_USERS } from '../types';

const initialState = {};

export default function users(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
}
