import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  capitalizeFirstLetter,
  formatDate,
  createExcerpt,
} from '../../utils/helpers';
import { favPost, unfavPost, togglePostUpvote, togglePostDownvote } from '../../redux/actions/data';
import { FaCommentAlt, FaRegStar, FaShareAlt, FaStar } from 'react-icons/fa';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

const Post = ({ dispatch, post, user }) => {
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

  return (
    <div className='post shadow-slim'>
      <div className='post-left'>
        <div className='post-left__rating'>
          <button
            className='post-left__rating-upvote'
            onClick={handleUpvote}
          >
            <ImArrowUp
              style={{ color: hasUpvoted === true ? '#ff4500' : null }}
              className='post-left__rating-upvote__icon'
            />
          </button>
          <span className='post-left__rating-number' style={{ color: hasUpvoted === true || hasDownvoted === true ? '#ff4500' : null }}>{voteScore}</span>
          <button
            className='post-left__rating-downvote'
            onClick={handleDownvote}
          >
            <ImArrowDown
              style={{ color: hasDownvoted === true ? '#ff4500' : null }}
              className='post-left__rating-downvote__icon'
            />
          </button>
        </div>
      </div>
      <div className='post-right'>
        <div className='post-right__top'>
          <ul className='post-right__top-list'>
            <li className='post-right__top-list__item'>
              <Link to={`/profile/${author}`}>
                <img src={userImage} alt="User's profile image" />
              </Link>
            </li>
            <li className='post-right__top-list__item post-right__top-list__item--author'>
              <Link to={`/profile/${author}`}>{author}</Link>
            </li>
            <li className='post-right__top-list__item'>
              <Link to={`/${category}`}>
                in <b>{capitalizeFirstLetter(category)}</b> at{' '}
                {formatDate(createdAt)}
              </Link>
            </li>
          </ul>
        </div>
        <Link to={`/posts/${id}`} className='post-right__center'>
          <h4 className='post-right__center-title'>{title}</h4>
          <p className='post-right__center-content'>{createExcerpt(body)}</p>
        </Link>
        <div className='post-right__bottom'>
          <ul className='post-right__bottom-list'>
            <li className='post-right__bottom-list__item'>
              <Link to={`/posts/${id}`}>
                <FaCommentAlt className='post-right__bottom-list__item-commentIcon' />{' '}
                {commentCount} comments
              </Link>
            </li>
            {!isLoggedIn ? (
              <li className='post-right__bottom-list__item'>
                <button className='post-right__bottom-list__item-favBtn' onClick={handleFav} >
                  {isFaved === true ? (
                    <FaStar className='post-right__bottom-list__item-favBtn__starIcon post-right__bottom-list__item-favBtn__starIcon--active' />
                  ) : (
                    <FaRegStar className='post-right__bottom-list__item-favBtn__starIcon ' />
                  )}
                  {isFaved === true ? 'Unfav' : 'Fav'}
                </button>
              </li>
            ) : null}
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

export default withRouter(connect(mapStateToProps)(Post));
