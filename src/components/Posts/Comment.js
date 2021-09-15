import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../../utils/helpers';
import { FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../redux/actions/data';

const Comment = ({ data, user, dispatch }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [showNewComment, setShowNewComment] = useState(false);

  const { userName, userImage, id, postId, createdAt, body } = data;

  useEffect(() => {
    if (user.credentials.userName === userName) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  // const handleReply = () => {
  //   setShowNewComment(!showNewComment);
  // };

  const handleDelete = () => {
    dispatch(deleteComment(postId, id));
  };

  return (
    <li className="comment">
      <div className="comment-top">
        <Link to={`/profile/${userName}`}>
          <img src={userImage} className="comment-top__img" />
        </Link>
        <Link to={`/profile/${userName}`} className="comment-top__author">
          @{userName}
        </Link>
        <span className="comment-top__timestamp">{formatDate(createdAt)}</span>
      </div>
      <div className="comment-middle">
        <p className="comment-middle__body">{body}</p>
        {/* {showNewComment === true ? <NewComment /> : null} */}
      </div>
      <div className="comment-bottom">
        <ul className="comment-bottom__list">
          {/* Upvote and downvote funcitonality disabled */}
          {/* <li className='comment-bottom__list-item'>
            <a
              href='#'
              onClick={() => {
                // if (author === authedUser.id) {
                //   toast.error('You can\'t vote on your own comments')
                // } else {
                //   // dispatch
                // }
              }}
            >
              <ImArrowUp className='comment-bottom__list-item__icon comment-bottom__list-item__icon--arrow' />
            </a>
          </li>
          <li className='comment-bottom__list-item'>
            <span className='comment-bottom__list-item__voteScore'>0</span>
          </li>
          <li className='comment-bottom__list-item'>
            <a
              href='#'
              onClick={() => {
                // if (author === authedUser.id) {
                //   toast.error('You can\'t vote on your own comments')
                // } else {
                //   // dispatch
                // }
              }}
            >
              <ImArrowDown className='comment-bottom__list-item__icon comment-bottom__list-item__icon--arrow' />
            </a>
          </li> */}
          {/* {!isLoggedIn ? (
            <li className='comment-bottom__list-item'>
              <a href='#' onClick={handleReply}>
                <FaCommentAlt className='comment-bottom__list-item__icon comment-bottom__list-item__icon--comment' />{' '}
                <span className='comment-bottom__list-item__reply'>Reply</span>
              </a>
            </li>
          ) : null} */}
          {isLoggedIn ? (
            <li className="comment-bottom__list-item">
              <button onClick={handleDelete}>
                <FaTimesCircle className="comment-bottom__list-item__icon comment-bottom__list-item__icon--delete" />{' '}
                <span className="comment-bottom__list-item__delete">
                  {' '}
                  Delete
                </span>
              </button>
            </li>
          ) : null}
        </ul>
      </div>
    </li>
  );
};

function mapStateToProps({ user }) {
  return {
    user,
  };
}

export default connect(mapStateToProps)(Comment);
