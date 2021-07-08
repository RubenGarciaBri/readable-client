import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { GoAlert } from 'react-icons/go';
import { submitComment } from '../../redux/actions/data';

const NewComment = ({ dispatch, id }) => {
  const [body, setBody] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(submitComment(id, commentData));
    setBody('')
  };

  const commentData = {
    body
  }

  return (
    <div className='newComment'>
      <form className='newComment__form' onSubmit={(e) => onFormSubmit(e)}>
        <textarea
          value={body}
          required={true}
          placeholder='Add Comment'
          rows={4}
          className='newComment__form-textarea'
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <>
          {errorMessage === true ? (
            <span className={'newComment__form-error'}>
              <GoAlert size={14} /> Please select a category
            </span>
          ) : null}
          <button type='submit' className='newComment__form-btn'>
            Add Comment
          </button>
        </>
      </form>
    </div>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(NewComment);
