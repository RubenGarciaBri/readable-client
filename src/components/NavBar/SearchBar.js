import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDateYearOnly } from '../../utils/helpers';
import {
  FaComment,
  FaCommentAlt,
  FaRegStar,
  FaShareAlt,
  FaStar,
} from 'react-icons/fa';
import useOutsideClick from '../../utils/helpers';

const SearchBar = ({ dispatch }) => {
  const [term, setTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const node = useRef();

  useOutsideClick(node, () => {
    setTerm('');
  });

  useEffect(() => {}, [term]);

  let history = useHistory();

  const onInputChange = (value) => {
    setTerm(value);

    fetch(`http://localhost:3001/${term}/posts`, {
      headers: {
        Authorization: 'mytoken',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data);
          setSearchResults(data);
        }
      });
  };

  return (
    <form ref={node} action='#' className='searchBar'>
      <input
        required={true}
        type='text'
        value={term}
        placeholder='Title'
        className='searchBar__input'
        onChange={(e) => onInputChange(e.target.value)}
      />
      <ul
        className={`searchBar__results ${
          term.length > 0 ? 'searchBar__results--hidden' : ''
        }`}
      >
        {term.length >= 2
          ? searchResults.map((item) => {
              return (
                <li key={item.id} className='searchBar__results-item'>
                  <Link
                    to={`/posts/${item.id}`}
                    className='searchBar__results-item__link'
                  >
                    <div className='searchBar__results-item__link-left'>
                      <span className='searchBar__results-item__link-left__title'>
                        {item.title}
                      </span>
                      <div className='searchBar__results-item__link-left__sub'>
                        <span className='searchBar__results-item__link-left__sub-category'>
                          /{item.category}
                        </span>
                        <span>
                          <FaCommentAlt className='searchBar__results-item__link-left__sub-icon' />{' '}
                          {item.comments.length}
                        </span>
                      </div>
                    </div>
                    <div className='searchBar__results-item__link-right'>
                      <span>
                        {item.author} | {formatDateYearOnly(item.timestamp)}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })
          : null}
      </ul>
    </form>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(SearchBar);
