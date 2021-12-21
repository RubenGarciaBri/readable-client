import initialState from './initialState';
import { SET_USERS } from './types';
import { nestedIdObjectToArray } from '../../../utils/helpers';

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        byId: action.payload,
        allIds: nestedIdObjectToArray(action.payload).map(
          user => user.userName
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default usersReducer;
