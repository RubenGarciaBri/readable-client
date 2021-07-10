import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { capitalizeFirstLetter, formatDate } from '../../utils/helpers';
import { favPost, unfavPost } from '../../redux/actions/data';
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
import NewComment from './NewComment';
import Comment from './Comment';

const OpenedPost = ({ user, dispatch, post }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFaved, setIsFaved] = useState(false);

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

  // Sort comments from newest to oldest
  const sortedComments = comments.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  useEffect(() => {
    if (user.credentials.userName === author) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  useEffect(() => {
    // Create an array containing the user names of all the users that have faved this post
    const usersArray = [];
    favs.forEach((fav) => {
      usersArray.push(fav.userName);
    });

    // If any of the user names in the array matches the authenticated user, set isFaved to true
    if (usersArray.includes(user.credentials.userName)) {
      setIsFaved(true);
    } else {
      setIsFaved(false);
    }
  }, [user, post]);

  const handleFav = () => {
    if (isFaved === false) {
      dispatch(favPost(id));
    } else {
      dispatch(unfavPost(id));
    }
  };

  const handleDelete = () => {
    dispatch(deletePost(id));
    history.push('/');
  };

  // Change later!!
  const hasUpvoted = false;
  const hasDownvoted = false;

  return (
    <div className='postOpened shadow-slim'>
      <div className='postOpened-left'>
        <div className='postOpened-left__rating'>
          <a
            href='#'
            className='postOpened-left__rating-upvote'
            onClick={() => {}}
          >
            <ImArrowUp
              // style={{ color: hasUpvoted === true ? 'orange' : null }}
              className='postOpened-left__rating-upvote__icon'
            />
          </a>
          <span className='postOpened-left__rating-number'>{voteScore}</span>
          <a
            href='#'
            className='postOpened-left__rating-downvote'
            onClick={() => {}}
          >
            <ImArrowDown
              // style={{ color: hasDownvoted === true ? 'orange' : null }}
              className='postOpened-left__rating-downvote__icon'
            />
          </a>
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
              <a href='#'>
                in <b>{capitalizeFirstLetter(category)}</b> at{' '}
                {formatDate(createdAt)}
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
            {!isLoggedIn ? (
              <li className='postOpened-right__bottom-list__item'>
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
            {isLoggedIn ? (
              <li className='postOpened-right__bottom-list__item postOpened-right__bottom-list__item--delete'>
                <a href='#' onClick={handleDelete}>
                  <FaTrashAlt className='post-right__bottom-list__item-deleteIcon' />{' '}
                  Delete
                </a>
              </li>
            ) : null}
          </ul>
        </div>
        <NewComment id={id} />
        <div className='comment-section'>
          <ul className='comment-list'>
            {sortedComments.length > 0
              ? sortedComments.map((comment) => {
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
