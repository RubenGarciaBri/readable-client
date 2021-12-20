import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { spinnerStylesDefault } from '../sass/spinnerStyles';
import { GoAlert } from 'react-icons/go';
import { postPost } from '../redux/store/posts/actions';
import useOutsideClick from '../utils/helpers';

const CreatePost = ({ dispatch, user, UI }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [rows, setRows] = useState(1);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);

  const node = useRef();
  const history = useHistory();

  useOutsideClick(node, () => {
    onInputBlur();
  });

  const categories = ['sports', 'music', 'business'];

  const newPost = {
    title,
    body,
    category,
  };

  const clearValues = () => {
    setTitle('');
    setBody('');
    setCategory(null);
    setRows(1);
    setIsVisible(false);
  };

  const onInputFocus = () => {
    // Check if there is no authenticated user to prevent post to be created
    if (user.authenticated === false) {
      history.push('/login');
    } else {
      setIsVisible(true);
      setRows(5);
    }
  };

  const onInputBlur = () => {
    setIsVisible(false);
    setRows(1);
  };

  const onInputChange = value => {
    setTitle(value);
  };

  const onTextareaChange = value => {
    setBody(value);
  };

  const onCategoryChange = value => {
    if (errorMessage === true) {
      setErrorMessage(false);
    }
    setCategory(value);
  };

  const onFormSubmit = e => {
    e.preventDefault();

    // Category form validation
    if (category !== null) {
      dispatch(postPost(newPost));
      clearValues();
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <div
      ref={node}
      className={`createPost shadow-slim ${
        isVisible === true ? 'cursor-auto' : 'cursor-pointer'
      }`}
      onClick={onInputFocus}
    >
      <div className="createPost__left"></div>
      <div className="createPost__right">
        <form
          action="#"
          className="createPost__right-form"
          onSubmit={e => onFormSubmit(e)}
        >
          {isVisible === true ? (
            <input
              required={true}
              type="text"
              value={title}
              placeholder="Title"
              className="createPost__right-form__input"
              onChange={e => onInputChange(e.target.value)}
            />
          ) : null}
          <textarea
            value={body}
            required={true}
            placeholder="Create post"
            rows={rows}
            className="createPost__right-form__textarea"
            onChange={e => onTextareaChange(e.target.value)}
          ></textarea>

          {isVisible === true ? (
            <>
              <ul className="createPost__right-form__categories">
                <span className="createPost__right-form__categories-title">
                  Category
                </span>
                {categories.map(item => {
                  return (
                    <li
                      key={item}
                      className={`createPost__right-form__categories-item ${
                        category === item
                          ? 'createPost__right-form__categories-item--active'
                          : null
                      }`}
                    >
                      <a
                        href="#"
                        onClick={e => onCategoryChange(e.target.innerText)}
                      >
                        {item}
                      </a>
                    </li>
                  );
                })}
              </ul>
              {errorMessage === true ? (
                <span className={'createPost__right-form__error'}>
                  <GoAlert size={14} /> Please select a category
                </span>
              ) : null}
              <button type="submit" className="createPost__right-form__btn">
                Create Post
              </button>
            </>
          ) : null}
        </form>
      </div>
    </div>
  );
};

function mapStateToProps({ user, UI }) {
  return {
    user,
    UI,
  };
}

export default connect(mapStateToProps)(CreatePost);
