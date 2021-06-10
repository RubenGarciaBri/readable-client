import React, { useState } from 'react'
import { FaCommentAlt } from 'react-icons/fa'
import { ImArrowUp, ImArrowDown } from 'react-icons/im'
import NewComment from '../NewComment'

const Comment = () => {
  const [showNewComment, setShowNewComment] = useState(false)

  const handleReply = () => {
    setShowNewComment(!showNewComment)
  }

  return (
    <li className="comment">
      <div className="comment-top">
        <img src="https://randomuser.me/api/portraits/men/8.jpg" className="comment-top__img"/>
        <span className="comment-top__author">Nickname</span>
        <span className="comment-top__timestamp">2 hours ago</span>
      </div>
      <div className="comment-middle">
        <p className="comment-middle__body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nulla ipsum, vehicula ut feugiat vel, elementum vulputate nulla. Etiam arcu odio, mollis at diam eu, venenatis mollis purus. Praesent mi velit, luctus auctor est ac, eleifend vulputate nisl. Aliquam eleifend, lectus sit amet vestibulum fringilla, turpis neque euismod odio, a rhoncus dui neque id nunc. Nam rhoncus, libero id bibendum tempor, ex urna euismod lorem, consequat egestas purus libero finibus augue. Suspendisse nunc dolor, viverra in dictum non, posuere nec velit. Proin et facilisis purus. Suspendisse vitae pellentesque sem. Sed eu est rhoncus, sodales quam sed, rhoncus dui.
        </p>
        {showNewComment === true 
          ? <NewComment/>
          : null
        }
      </div>
      <div className="comment-bottom">
        <ul className="comment-bottom__list">
          <li className="comment-bottom__list-item">
            <a href="#" onClick={() => {
              // if (author === authedUser.id) {
              //   toast.error('You can\'t vote on your own comments')
              // } else {
              //   // dispatch
              // }
              }}>
              <ImArrowUp className="comment-bottom__list-item__icon comment-bottom__list-item__icon--arrow" />
            </a>
          </li>
          <li className="comment-bottom__list-item">
            <span className="comment-bottom__list-item__voteScore">0</span>
          </li>
          <li className="comment-bottom__list-item">
            <a href="#" onClick={() => {
              // if (author === authedUser.id) {
              //   toast.error('You can\'t vote on your own comments')
              // } else {
              //   // dispatch
              // }
              }}>
              <ImArrowDown className="comment-bottom__list-item__icon comment-bottom__list-item__icon--arrow" />
            </a>
          </li>
          <li className="comment-bottom__list-item">
            <a href="#" onClick={handleReply}>
              <FaCommentAlt className="comment-bottom__list-item__icon comment-bottom__list-item__icon--comment"/> <span className="comment-bottom__list-item__reply">Reply</span>
            </a>
          </li>
        </ul>
      </div>
    </li>
  )
}

export default Comment
