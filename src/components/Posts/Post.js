import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  capitalizeFirstLetter,
  formatDate,
  createExcerpt,
} from '../../utils/helpers';
import {
  handleToggleUpvote,
  handleToggleDownvote,
} from '../../redux/actions/data';
import { handleToggleFav } from '../../redux/actions/data';
import { FaCommentAlt, FaRegStar, FaShareAlt, FaStar } from 'react-icons/fa';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';
import NewComment from './NewComment';
import Comment from './Comment';
import axios from 'axios'

const Post = ({ dispatch, post, opened, user }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
  } = post;

  useEffect(() => {
    if (user.credentials.userName === author) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  // Change later!!
  const hasUpvoted = false;
  const hasDownvoted = false;
  const hasFaved = false;

  const onFavClick = () => {
    if (author === user.credentials.userName) {
      toast.error("You can't fav your own posts");
    } else {
      // dispatch(handleToggleFav(id))
    }
  };

  const defaultPost = () => {
    return (
      <div className='post shadow-slim'>
        <div className='post-left'>
          <div className='post-left__rating'>
            <a
              href='#'
              className='post-left__rating-upvote'
              onClick={() => { 
                // dispatch(handleToggleUpvote(id))
              }}
            >
              <ImArrowUp
                style={{ color: hasUpvoted === true ? 'orange' : null }}
                className='post-left__rating-upvote__icon'
              />
            </a>
            <span className='post-left__rating-number'>{voteScore}</span>
            <a
              href='#'
              className='post-left__rating-downvote'
              onClick={() => {     
                // dispatch(handleToggleDownvote(id))
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
              <li className='post-right__bottom-list__item'>
                {!isLoggedIn ? (
                  <a href='#' onClick={onFavClick}>
                    {hasFaved === true ? (
                      <FaStar className='post-right__bottom-list__item-starIcon post-right__bottom-list__item-starIcon--active' />
                    ) : (
                      <FaRegStar className='post-right__bottom-list__item-starIcon' />
                    )}
                    Fav
                  </a>
                ) : null}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  
  return defaultPost();
};

function mapStateToProps({ data, user }, { id }) {
  const post = data.posts[id];

  return {
    post,
    user,
  };
}

export default withRouter(connect(mapStateToProps)(Post));
