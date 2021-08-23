import {
  LOADING_DATA,
  SET_USERS,
  SET_POSTS,
  POST_POST,
  DELETE_POST,
  FAV_POST,
  UNFAV_POST,
  SUBMIT_COMMENT,
  DELETE_COMMENT,
  TOGGLE_POST_UPVOTE,
  TOGGLE_POST_DOWNVOTE,
  TOGGLE_COMMENT_UPVOTE,
  TOGGLE_COMMENT_DOWNVOTE
} from '../types';
import {
  nestedIdObjectToArray,
  arrayIntoNestedIdObject,
} from '../../utils/helpers';

const initialState = {
  posts: {},
  users: {},
  loading: false,
};

export default function data(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: Object.keys(state.posts).length === 0 ? true : false
      };

    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
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

    case DELETE_POST:
      const postsArray = nestedIdObjectToArray(state.posts);
      const filteredArray = postsArray.filter(
        (post) => post.id !== action.payload.postId
      );
      const newPostsObject = arrayIntoNestedIdObject(filteredArray);

      return {
        ...state,
        posts: newPostsObject,
      };

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
              (comment) => comment.id !== action.payload.commentId
            ),
            commentCount: state.posts[action.payload.postId].commentCount - 1,
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

      case TOGGLE_COMMENT_UPVOTE:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.postId]: {
            ...state.posts[action.payload.postId],
            comments: state.posts[action.payload.postId].comments.concat(action.payload)        
          },
        },
      };

    case TOGGLE_COMMENT_DOWNVOTE:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.postId]: {
            ...state.posts[action.payload.postId],
            comments: state.posts[action.payload.postId].comments.concat(action.payload)        
          },
        },
      };

    default:
      return state;
  }
}
