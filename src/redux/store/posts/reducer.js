import initialState from './initialState';

import {
  arrayIntoNestedIdObject,
  nestedIdObjectToArray,
} from '../../../utils/helpers';

import {
  LOADING_POSTS,
  SET_POSTS,
  POST_POST,
  DELETE_POST,
  FAV_POST,
  UNFAV_POST,
  TOGGLE_POST_UPVOTE,
  TOGGLE_POST_DOWNVOTE,
} from './types';

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        byId: action.payload,
        // TODO: Make more readable later
        allIds: nestedIdObjectToArray(action.payload).map(post => post.id),
        loading: false,
      };

    case POST_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.id]: action.payload,
        },
      };

    case DELETE_POST: {
      const postsArray = nestedIdObjectToArray(state.posts);

      const filteredArray = postsArray.filter(
        post => post.id !== action.payload.postId
      );
      const newPostsObject = arrayIntoNestedIdObject(filteredArray);

      return {
        ...state,
        posts: newPostsObject,
      };
    }

    case FAV_POST:
    case UNFAV_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.id]: {
            ...state.posts[action.payload.id],
            favCount: action.payload.favCount,
            favs: action.payload.favs,
          },
        },
      };

    case TOGGLE_POST_UPVOTE:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.postId]: {
            ...state.posts[action.payload.postId],
            voteScore: action.payload.voteScore,
            upvotes: action.payload.upvotes,
            downvotes: action.payload.downvotes,
          },
        },
      };

    case TOGGLE_POST_DOWNVOTE:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.postId]: {
            ...state.posts[action.payload.postId],
            voteScore: action.payload.voteScore,
            upvotes: action.payload.upvotes,
            downvotes: action.payload.downvotes,
          },
        },
      };

    default:
      return state;
  }
};

export default postsReducer;
