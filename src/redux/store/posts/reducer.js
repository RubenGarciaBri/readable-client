import initialState from './initialState';

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
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
