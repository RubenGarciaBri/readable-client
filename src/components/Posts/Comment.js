import React, { useState } from 'react';
import { formatDate } from '../../utils/helpers';
import { FaCommentAlt } from 'react-icons/fa';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import NewComment from './NewComment';

const Comment = ({ data }) => {
  const [showNewComment, setShowNewComment] = useState(false);

  const { userName, userImage, postId, createdAt, body } = data

  const handleReply = () => {
    setShowNewComment(!showNewComment);
  };

  return (
    <li className='comment'>
      <div className='comment-top'>
        <img
          src={userImage}
          className='comment-top__img'
        />
        <span className='comment-top__author'>{userName}</span>
        <span className='comment-top__timestamp'>{formatDate(createdAt)}</span>
      </div>
      <div className='comment-middle'>
        <p className='comment-middle__body'>{body}</p>
        {showNewComment === true ? <NewComment /> : null}
      </div>
      <div className='comment-bottom'>
        <ul className='comment-bottom__list'>
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
          </li>
          <li className='comment-bottom__list-item'>
            <a href='#' onClick={handleReply}>
              <FaCommentAlt className='comment-bottom__list-item__icon comment-bottom__list-item__icon--comment' />{' '}
              <span className='comment-bottom__list-item__reply'>Reply</span>
            </a>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default Comment;
