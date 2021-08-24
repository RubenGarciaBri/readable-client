import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { capitalizeFirstLetter, formatDate } from '../../utils/helpers';
import { favPost, unfavPost, togglePostUpvote, togglePostDownvote } from '../../redux/actions/data';
import { deletePost } from '../../redux/actions/data';
import {
  FaCommentAlt,
  FaRegStar,
  FaShareAlt,
  FaStar,
  FaTimesCircle,
  FaTrashAlt,
} from 'react-icons/fa';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import NewComment from './NewComment';
import Comment from './Comment';


const OpenedPost = ({ user, dispatch, post }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFaved, setIsFaved] = useState(false);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);  

  const history = useHistory();

  const {
    id,
    title,
    body,
    category,
    author,
    createdAt,
    favCount,
    commentCount,
    voteScore,
    userImage,
    upvotes,
    downvotes,
    favs,
    comments,
  } = post;

  useEffect(() => {
    if (user.credentials.userName === author) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  useEffect(() => {
    // Create array containing the usernames of all the users that have faved this post
    const usersFavArray = [];
    favs.forEach((fav) => {
      usersFavArray.push(fav.userName);
    });

    // If any of the usernames in the array matches the authenticated user, set isFaved to true
    if (usersFavArray.includes(user.credentials.userName)) {
      setIsFaved(true);
    } else {
      setIsFaved(false);
    }

    // Create array containing the usernames of all the users that have upvoted and downvoted this post
    const usersUpvoteArray = [];
    upvotes.forEach((upvote) => {
      usersUpvoteArray.push(upvote.userName);
    });

    const usersDownvoteArray = [];
    downvotes.forEach((downvote) => {
      usersDownvoteArray.push(downvote.userName);
    });

    // If any of the usernames in the arrays match the authenticated user, set hasUpvoted and hasDownvoted accordingly
    if (usersUpvoteArray.includes(user.credentials.userName)) {
      setHasUpvoted(true);
    } else {
      setHasUpvoted(false);
    }

    if (usersDownvoteArray.includes(user.credentials.userName)) {
      setHasDownvoted(true);
    } else {
      setHasDownvoted(false);
    }

  }, [user, post]);

  const handleUpvote = () => {
    // Check if there's an authenticated user
    if (user.authenticated === false) {
      history.push('/login');
    } else {
      // Check if the author is logged in
      if (isLoggedIn === true) {
        toast.error("You can't upvote your own posts")
      } else {
        dispatch(togglePostUpvote(id))
      } 
    }
  };

  const handleDownvote = () => {
    // Check if there's an authenticated user
    if (user.authenticated === false) {
      history.push('/login');
    } else {
      // Check if the author is logged in
      if (isLoggedIn === true) {
        toast.error("You can't downvote your own posts")
      } else {
        dispatch(togglePostDownvote(id))
      } 
    }
  };

  const handleFav = () => {
    // Check if there's an authenticated user
   if (user.authenticated === false) {
     history.push('/login');
   } else {
     // Check if the author is logged in
     if (isLoggedIn === true) {
       toast.error("You can't fav your own posts")
     } else {
       // Check if the post has been faved and perform the correct action
       if (isFaved === false) {
         dispatch(favPost(id));
       } else {
         dispatch(unfavPost(id));
       }
     }
   }
 };

  const handleDelete = () => {
    dispatch(deletePost(id));
    history.push('/');
  };

  return (
    <div className='postOpened shadow-slim'>
      <div className='postOpened-left'>
        <div className='postOpened-left__rating'>
          <button
            className='postOpened-left__rating-upvote'
            onClick={handleUpvote}
          >
            <ImArrowUp
              style={{ color: hasUpvoted === true ? '#ff4500' : null }}
              className='postOpened-left__rating-upvote__icon'
            />
          </button>
          <span className='postOpened-left__rating-number' style={{ color: hasUpvoted === true || hasDownvoted === true ? '#ff4500' : null }}>{voteScore}</span>
          <button
            className='postOpened-left__rating-downvote'
            onClick={handleDownvote}
          >
            <ImArrowDown
              style={{ color: hasDownvoted === true ? '#ff4500' : null }}
              className='postOpened-left__rating-downvote__icon'
            />
          </button>
        </div>
      </div>
      <div className='postOpened-right'>
        <div className='postOpened-right__top'>
          <ul className='postOpened-right__top-list'>
            <li className='postOpened-right__top-list__item'>
              <Link to={`/profile/${author}`}>
                <img src={userImage} alt="User's profile image" />
              </Link>
            </li>
            <li className='postOpened-right__top-list__item postOpened-right__top-list__item--author'>
              <Link to={`/profile/${author}`}>{author}</Link>
            </li>
            <li className='postOpened-right__top-list__item'>
              <Link to={`/${category}`}>
                in <b>{capitalizeFirstLetter(category)}</b> at{' '}
                {formatDate(createdAt)}
              </Link>
            </li>
          </ul>
        </div>
        <div className='postOpened-right__center'>
          <h4 className='postOpened-right__center-title'>{title}</h4>
          <p className='postOpened-right__center-content'>{body}</p>
        </div>
        <div className='postOpened-right__bottom'>
          <ul className='postOpened-right__bottom-list'>
            <li className='postOpened-right__bottom-list__item'>
              <Link to={`/posts/${id}`}>
                <FaCommentAlt className='postOpened-right__bottom-list__item-icon' />{' '}
                {commentCount} comments
              </Link>
            </li>
            {!isLoggedIn ? (
              <li className='postOpened-right__bottom-list__item'>
                <button onClick={handleFav} className='postOpened-right__bottom-list__item-favBtn'>
                  {isFaved === true ? (
                    <FaStar className='postOpened-right__bottom-list__item-favBtn__starIcon postOpened-right__bottom-list__item-favBtn__starIcon--active' />
                  ) : (
                    <FaRegStar className='postOpened-right__bottom-list__item-favBtn__starIcon' />
                  )}
                  {isFaved === true ? 'Unfav' : 'Fav'}
                </button>
              </li>
            ) : null}
            {isLoggedIn ? (
              <li className='postOpened-right__bottom-list__item postOpened-right__bottom-list__item--delete'>
                <button onClick={handleDelete}>
                  <FaTrashAlt className='post-right__bottom-list__item-deleteIcon' />{' '}
                  Delete
                </button>
              </li>
            ) : null}
          </ul>
        </div>
        {
          // Only show New Comment component if there is an authenticated user
          user.authenticated !== false ? (
            <NewComment id={id} />
          ) : null
        }
        <div className='comment-section'>
          <ul className='comment-list'>
            {comments.length > 0
              ? comments.map((comment) => {
                  return <Comment data={comment} key={comment.id} />;
                })
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ data, user }, { id }) {
  const post = data.posts[id];

  return {
    post,
    user,
  };
}

export default connect(mapStateToProps)(OpenedPost);
