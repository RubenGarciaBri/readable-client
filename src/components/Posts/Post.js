import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { formatPost, formatDate } from '../../utils/helpers';
import {
  handleToggleUpvote,
  handleToggleDownvote,
} from '../../redux/actions/posts';
import { handleToggleFav } from '../../redux/actions/posts';
import { FaCommentAlt, FaRegStar, FaShareAlt, FaStar } from 'react-icons/fa';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';
import NewComment from '../NewComment';
import Comment from './Comment';

const images = {
  music:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf8sGs4-l0HyKAyW1kb46fXnEPQo7lUi3_iA&usqp=CAU',
  sports:
    'https://blogofthenet.files.wordpress.com/2020/07/taa.jpg?w=256&h=256&crop=1',
  business:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvW9Cbechc2qraRG4d84OWM0xvHtYzYcbrgQ&usqp=CAU',
};

const Post = ({ dispatch, post, authedUser, opened }) => {
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
    upvotes,
    downvotes,
  } = post;

  // Change later!!
  const hasUpvoted = false;
  const hasDownvoted = false;
  const hasFaved = false;

  const onFavClick = () => {
    if (author === authedUser.id) {
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
                if (author === authedUser.id) {
                  toast.error("You can't vote on your own posts");
                } else {
                  // dispatch(handleToggleUpvote(id))
                }
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
                if (author === authedUser.id) {
                  toast.error("You can't vote on your own posts");
                } else {
                  // dispatch(handleToggleDownvote(id))
                }
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
                <img
                  src={
                    category === 'sports'
                      ? images.sports
                      : category === 'business'
                      ? images.business
                      : images.music
                  }
                  alt=''
                />
              </li>
              <li className='post-right__top-list__item post-right__top-list__item--category'>
                <a href='#'>r/{category}</a>
              </li>
              <li className='post-right__top-list__item'>
                <a href='#'>
                  Posted by {author} at {createdAt}
                </a>
              </li>
            </ul>
          </div>
          <Link to={`/posts/${id}`} className='post-right__center'>
            <h4 className='post-right__center-title'>{title}</h4>
            <p className='post-right__center-content'>{body}</p>
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
                <a href='#' onClick={onFavClick}>
                  {hasFaved === true ? (
                    <FaStar className='post-right__bottom-list__item-starIcon post-right__bottom-list__item-starIcon--active' />
                  ) : (
                    <FaRegStar className='post-right__bottom-list__item-starIcon' />
                  )}
                  Fav
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const openedPost = () => {
    return (
      <div className='postOpened shadow-slim'>
        <div className='postOpened-left'>
          <div className='postOpened-left__rating'>
            <a
              href='#'
              className='postOpened-left__rating-upvote'
              onClick={() => {
                if (author === authedUser.id) {
                  toast.error("You can't vote on your own posts");
                } else {
                  // dispatch(handleToggleUpvote(id))
                }
              }}
            >
              <ImArrowUp
                style={{ color: hasUpvoted === true ? 'orange' : null }}
                className='postOpened-left__rating-upvote__icon'
              />
            </a>
            <span className='postOpened-left__rating-number'>{voteScore}</span>
            <a
              href='#'
              className='postOpened-left__rating-downvote'
              onClick={() => {
                if (author === authedUser.id) {
                  toast.error("You can't vote on your own posts");
                } else {
                  // dispatch(handleToggleDownvote(id))
                }
              }}
            >
              <ImArrowDown
                style={{ color: hasDownvoted === true ? 'orange' : null }}
                className='postOpened-left__rating-downvote__icon'
              />
            </a>
          </div>
        </div>
        <div className='postOpened-right'>
          <div className='postOpened-right__top'>
            <ul className='postOpened-right__top-list'>
              <li className='postOpened-right__top-list__item'>
                <img
                  src={
                    category === 'sports'
                      ? images.sports
                      : category === 'business'
                      ? images.business
                      : images.music
                  }
                  alt=''
                />
              </li>
              <li className='postOpened-right__top-list__item postOpened-right__top-list__item--category'>
                <a href='#'>r/{category}</a>
              </li>
              <li className='postOpened-right__top-list__item'>
                <a href='#'>
                  Posted by {author} at {formatDate(createdAt)}
                </a>
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
                <a href='#'>
                  <FaCommentAlt className='postOpened-right__bottom-list__item-icon' />{' '}
                  {commentCount} comments
                </a>
              </li>
              <li className='postOpened-right__bottom-list__item'>
                <a href='#' onClick={onFavClick}>
                  {hasFaved === true ? (
                    <FaStar className='post-right__bottom-list__item-starIcon post-right__bottom-list__item-starIcon--active' />
                  ) : (
                    <FaRegStar className='post-right__bottom-list__item-starIcon' />
                  )}
                  Fav
                </a>
              </li>
            </ul>
          </div>
          <NewComment id={id} />
          <div className='comment-section'>
            <ul className='comment-list'>
              <Comment />
            </ul>
          </div>
        </div>
      </div>
    );
  };

  if (!opened) {
    return defaultPost();
  } else {
    return openedPost();
  }
};

function mapStateToProps({ authedUser, posts, users }, { id }) {
  const post = posts[id];
  const user = users[authedUser.id];

  return {
    authedUser,
    post: post,
    user,
  };
}

export default withRouter(connect(mapStateToProps)(Post));
