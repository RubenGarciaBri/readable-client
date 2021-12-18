import initialState from './initialState';

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: Object.keys(state.posts).length === 0 ? true : false,
      };

    default:
      return state;
  }
};

export default usersReducer;
