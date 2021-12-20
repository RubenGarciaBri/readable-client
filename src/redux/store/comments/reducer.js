import initialState from './initialState';

import { SUBMIT_COMMENT, DELETE_COMMENT } from './types';

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_COMMENT:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.postId]: {
            ...state.posts[action.payload.postId],
            comments: state.posts[action.payload.postId].comments.concat(
              action.payload
            ),
            commentCount: state.posts[action.payload.postId].commentCount + 1,
          },
        },
      };

    case DELETE_COMMENT:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.postId]: {
            ...state.posts[action.payload.postId],
            comments: state.posts[action.payload.postId].comments.filter(
              comment => comment.id !== action.payload.commentId
            ),
            commentCount: state.posts[action.payload.postId].commentCount - 1,
          },
        },
      };

    default:
      return state;
  }
};

export default commentsReducer;
