import React, { useState } from 'react';
import { connect } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { spinnerStylesDefault } from '../../sass/spinnerStyles';
import { submitComment } from '../../redux/actions/data';

const NewComment = ({ dispatch, id, UI }) => {
  const [body, setBody] = useState('');
  // const [errorMessage, setErrorMessage] = useState(false);

  const onFormSubmit = e => {
    e.preventDefault();
    dispatch(submitComment(id, commentData));
    setBody('');
  };

  const commentData = {
    body,
  };

  return (
    <div className="newComment">
      {UI.loading === true ? (
        <BeatLoader css={spinnerStylesDefault} loading />
      ) : (
        <form className="newComment__form" onSubmit={e => onFormSubmit(e)}>
          <textarea
            value={body}
            required={true}
            placeholder="Add Comment"
            rows={4}
            className="newComment__form-textarea"
            onChange={e => setBody(e.target.value)}
          ></textarea>
          <>
            {/* {errorMessage === true ? (
              <span className={'newComment__form-error'}>
                <GoAlert size={14} /> Please select a category
              </span>
            ) : null} */}
            <button type="submit" className="newComment__form-btn">
              Add Comment
            </button>
          </>
        </form>
      )}
    </div>
  );
};

function mapStateToProps({ authedUser, UI }) {
  return {
    authedUser,
    UI,
  };
}

export default connect(mapStateToProps)(NewComment);
