import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  capitalizeFirstLetter,
  formatDate,
  createExcerpt,
} from '../../utils/helpers';
import { favPost, unfavPost, togglePostUpvote, togglePostDownvote } from '../../redux/actions/data';
import { FaCommentAlt, FaRegStar, FaShareAlt, FaStar } from 'react-icons/fa';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { Link, withRouter } from 'react-router-dom';

const Post = ({ dispatch, post, opened, user }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFaved, setIsFaved] = useState(false);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);  

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

  const handleFav = () => {
    if (isFaved === false) {
      dispatch(favPost(id));
    } else {
      dispatch(unfavPost(id));
    }
  };

  return (
    <div className='post shadow-slim'>
      <div className='post-left'>
        <div className='post-left__rating'>
          <a
            href='#'
            className='post-left__rating-upvote'
            onClick={() => {
              dispatch(togglePostUpvote(id))
            }}
          >
            <ImArrowUp
              style={{ color: hasUpvoted === true ? 'orange' : null }}
              className='post-left__rating-upvote__icon'
            />
          </a>
          <span className='post-left__rating-number' style={{ color: hasUpvoted === true || hasDownvoted === true ? 'orange' : null }}>{voteScore}</span>
          <a
            href='#'
            className='post-left__rating-downvote'
            onClick={() => {
              dispatch(togglePostDownvote(id))
            }}
          >
            <ImArrowDown
              style={{ color: hasDownvoted === true ? 'orange' : null }}
              className='post-left__rating-downvote__icon'
            />
          </a>
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
              <a href='#'>
                in <b>{capitalizeFirstLetter(category)}</b> at{' '}
                {formatDate(createdAt)}
              </a>
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
                <a href='#' onClick={handleFav}>
                  {isFaved === true ? (
                    <FaStar className='post-right__bottom-list__item-starIcon post-right__bottom-list__item-starIcon--active' />
                  ) : (
                    <FaRegStar className='post-right__bottom-list__item-starIcon' />
                  )}
                  {isFaved === true ? 'Unfav' : 'Fav'}
                </a>
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
