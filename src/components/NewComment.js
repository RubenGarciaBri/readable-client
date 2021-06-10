import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { GoAlert } from 'react-icons/go';
import { handleAddComment } from '../redux/actions/data';

const NewComment = ({ dispatch, authedUser, id }) => {
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  console.log(id);

  const onTextareaChange = (value) => {
    setText(value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddComment(text, id));
  };

  return (
    <div className='newComment'>
      <form className='newComment__form' onSubmit={(e) => onFormSubmit(e)}>
        <textarea
          value={text}
          required={true}
          placeholder='Add Comment'
          rows={4}
          className='newComment__form-textarea'
          onChange={(e) => onTextareaChange(e.target.value)}
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
