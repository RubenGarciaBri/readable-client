import {
  SET_POSTS,
  POST_POST,
  FAV_POST,
  UNFAV_POST,
  ADD_COMMENT,
  TOGGLE_UPVOTE,
  TOGGLE_DOWNVOTE,
  TOGGLE_FAV,
} from '../types';

const initialState = {
  posts: {},
  post: {},
  loading: false
};

export default function data(state = initialState, action) {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case POST_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.id]: action.payload,
        } 
      };
    
    case FAV_POST:
    case UNFAV_POST:
    return {
      ...state,
      posts: {
        ...state.posts,
        [action.payload.postId]: action.payload,
      } 
    };

  

    case TOGGLE_UPVOTE:
      // Upvoted and not downvoted previously
      if (
        state[action.payload.id].upvotes.includes(
          action.payload.authedUser.id
        ) &&
        !state[action.payload.id].downvotes.includes(
          action.payload.authedUser.id
        )
      ) {
        return {
          ...state,
          [action.payload.id]: {
            ...state[action.payload.id],
            voteScore: state[action.payload.id].voteScore - 1,
            upvotes: state[action.payload.id].upvotes.filter(
              (user) => user !== action.payload.authedUser.id
            ),
          },
        };
      }
      // Upvoted and downvoted previously
      else if (
        !state[action.payload.id].upvotes.includes(
          action.payload.authedUser.id
        ) &&
        state[action.payload.id].downvotes.includes(
          action.payload.authedUser.id
        )
      ) {
        return {
          ...state,
          [action.payload.id]: {
            ...state[action.payload.id],
            voteScore: state[action.payload.id].voteScore + 2,
            downvotes: state[action.payload.id].downvotes.filter(
              (user) => user !== action.payload.authedUser.id
            ),
            upvotes: state[action.payload.id].upvotes.concat(
              action.payload.authedUser.id
            ),
          },
        };
      }
      // Upvote post
      else {
        return {
          ...state,
          [action.payload.id]: {
            ...state[action.payload.id],
            voteScore: state[action.payload.id].voteScore + 1,
            upvotes: state[action.payload.id].upvotes.concat(
              action.payload.authedUser.id
            ),
          },
        };
      }

    case TOGGLE_DOWNVOTE:
      // Downvoted and not upvoted previously
      if (
        state[action.payload.id].downvotes.includes(
          action.payload.authedUser.id
        ) &&
        !state[action.payload.id].upvotes.includes(action.payload.authedUser.id)
      ) {
        return {
          ...state,
          [action.payload.id]: {
            ...state[action.payload.id],
            voteScore: state[action.payload.id].voteScore + 1,
            downvotes: state[action.payload.id].downvotes.filter(
              (user) => user !== action.payload.authedUser.id
            ),
          },
        };
      }
      // Downvoted and upvoted previously
      else if (
        state[action.payload.id].upvotes.includes(action.payload.authedUser.id)
      ) {
        return {
          ...state,
          [action.payload.id]: {
            ...state[action.payload.id],
            voteScore: state[action.payload.id].voteScore - 2,
            upvotes: state[action.payload.id].upvotes.filter(
              (user) => user !== action.payload.authedUser.id
            ),
            downvotes: state[action.payload.id].downvotes.concat(
              action.payload.authedUser.id
            ),
          },
        };
      }
      // Downvote post
      else {
        return {
          ...state,
          [action.payload.id]: {
            ...state[action.payload.id],
            voteScore: state[action.payload.id].voteScore - 1,
            downvotes: state[action.payload.id].downvotes.concat(
              action.payload.authedUser.id
            ),
          },
        };
      }

    case TOGGLE_FAV:
      // Check if the post has already been faved
      if (
        state[action.payload.postId].favourites.includes(
          action.payload.authedUser.id
        )
      ) {
        return {
          ...state,
          [action.payload.postId]: {
            ...state[action.payload.postId],
            favourites: state[action.payload.postId].favourites.filter(
              (user) => user !== action.payload.authedUser.id
            ),
          },
        };
      }
      // Add favourite
      else {
        return {
          ...state,
          [action.payload.postId]: {
            ...state[action.payload.postId],
            favourites: state[action.payload.postId].favourites.concat(
              action.payload.authedUser.id
            ),
          },
        };
      }

    case ADD_COMMENT:
      return {
        ...state,
        [action.payload.comment.postId]: {
          ...state[action.payload.comment.postId],
          comments: state[action.payload.comment.postId].comments.concat(
            action.payload.comment
          ),
        },
      };

    default:
      return state;
  }
}
