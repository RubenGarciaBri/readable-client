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

    // case TOGGLE_POST_UPVOTE:
    //   const userNameList = [];

    //   action.payload.forEach((upvote) => {
    //     userNameList.push(upvote.userName);
    //   });

    //   // Upvoted and not downvoted previously
    //   if (
    //     userNameList.includes(action.payload.authedUser.id) &&
    //     !state[action.payload.id].downvotes.includes(
    //       action.payload.authedUser.id
    //     )
    //   ) {
    //     return {
    //       ...state,
    //       [action.payload.id]: {
    //         ...state[action.payload.id],
    //         voteScore: state[action.payload.id].voteScore - 1,
    //         upvotes: state[action.payload.id].upvotes.filter(
    //           (user) => user !== action.payload.authedUser.id
    //         ),
    //       },
    //     };
    //   }
    //   // Upvoted and downvoted previously
    //   else if (
    //     !state[action.payload.id].upvotes.includes(
    //       action.payload.authedUser.id
    //     ) &&
    //     state[action.payload.id].downvotes.includes(
    //       action.payload.authedUser.id
    //     )
    //   ) {
    //     return {
    //       ...state,
    //       [action.payload.id]: {
    //         ...state[action.payload.id],
    //         voteScore: state[action.payload.id].voteScore + 2,
    //         downvotes: state[action.payload.id].downvotes.filter(
    //           (user) => user !== action.payload.authedUser.id
    //         ),
    //         upvotes: state[action.payload.id].upvotes.concat(
    //           action.payload.authedUser.id
    //         ),
    //       },
    //     };
    //   }
    //   // Upvote post
    //   else {
    //     return {
    //       ...state,
    //       [action.payload.id]: {
    //         ...state[action.payload.id],
    //         voteScore: state[action.payload.id].voteScore + 1,
    //         upvotes: state[action.payload.id].upvotes.concat(
    //           action.payload.authedUser.id
    //         ),
    //       },
    //     };
    //   }

    // case TOGGLE_POST_DOWNVOTE:
    //   // Downvoted and not upvoted previously
    //   if (
    //     state[action.payload.id].downvotes.includes(
    //       action.payload.authedUser.id
    //     ) &&
    //     !state[action.payload.id].upvotes.includes(action.payload.authedUser.id)
    //   ) {
    //     return {
    //       ...state,
    //       [action.payload.id]: {
    //         ...state[action.payload.id],
    //         voteScore: state[action.payload.id].voteScore + 1,
    //         downvotes: state[action.payload.id].downvotes.filter(
    //           (user) => user !== action.payload.authedUser.id
    //         ),
    //       },
    //     };
    //   }
    //   // Downvoted and upvoted previously
    //   else if (
    //     state[action.payload.id].upvotes.includes(action.payload.authedUser.id)
    //   ) {
    //     return {
    //       ...state,
    //       [action.payload.id]: {
    //         ...state[action.payload.id],
    //         voteScore: state[action.payload.id].voteScore - 2,
    //         upvotes: state[action.payload.id].upvotes.filter(
    //           (user) => user !== action.payload.authedUser.id
    //         ),
    //         downvotes: state[action.payload.id].downvotes.concat(
    //           action.payload.authedUser.id
    //         ),
    //       },
    //     };
    //   }
    //   // Downvote post
    //   else {
    //     return {
    //       ...state,
    //       [action.payload.id]: {
    //         ...state[action.payload.id],
    //         voteScore: state[action.payload.id].voteScore - 1,
    //         downvotes: state[action.payload.id].downvotes.concat(
    //           action.payload.authedUser.id
    //         ),
    //       },
    //     };
    //   }

    default:
      return state;
  }
}
