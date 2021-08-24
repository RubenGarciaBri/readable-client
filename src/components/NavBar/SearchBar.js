import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';
import {
  FaComment,
  FaCommentAlt,
  FaRegStar,
  FaShareAlt,
  FaStar,
  FaSearch
} from 'react-icons/fa';
import useOutsideClick from '../../utils/helpers';
import algoliasearch from 'algoliasearch';
import _ from 'lodash';

const algoliaAppId = 'RGLSVZ565B';
const algoliaAdminKey = 'b42c90fe8c9f4f0a63301a1231bdc97d';
const algoliaIndexName = 'posts';

const SearchBar = () => {
  const [term, setTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // const [isOpen, setIsOpen] = useState(false);

  const node = useRef();

  useOutsideClick(node, () => {
    setTerm('');
  });

  // Algolia Initialisation and Config
  const client = algoliasearch(algoliaAppId, algoliaAdminKey);
  const index = client.initIndex(algoliaIndexName);
  index.setSettings({
    searchableAttributes: ['title', 'category', 'author'],
  });

  const getPosts = (value) => {
    index
      .search(value)
      .then((data) => {
        setSearchResults(data.hits);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const throttledSearch = useCallback(
    _.throttle((value) => {
      getPosts(value);
    }, 500),
    []
  );

  useEffect(() => {
    throttledSearch(term);
  }, [term, throttledSearch]);

  return (
    <>
      {/* Default Desktop */}
      <form
        ref={node}
        action='#'
        className='searchBar'
      >
        {/* Mobile Button */}
        {/* <div
        style={{
          position: 'relative',
        }}
        >
          <button
            className='searchBarButton'
            onClick={() => setIsOpen(true)}
            ref={node2}
          >
            <FaSearch className='searchBarButton__icon' />
          </button>
        </div> */}

        <input
          required={true}
          type='text'
          value={term}
          placeholder='Search posts...'
          className='searchBar__input'
          onChange={(e) => setTerm(e.target.value)}
        />
        <ul
          className={`searchBar__results ${
            term.length > 0 ? 'searchBar__results--hidden' : ''
          }`}
        >
          {term.length >= 2
            ? searchResults.map((item) => {
                return (
                  <li key={item.objectID} className='searchBar__results-item'>
                    <Link
                      to={`/posts/${item.objectID}`}
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
                            {item.commentCount}
                          </span>
                        </div>
                      </div>
                      <div className='searchBar__results-item__link-right'>
                        <span>
                          {item.author} | {formatDate(item.createdAt)}
                        </span>
                      </div>
                    </Link>
                  </li>
                )
              })
            : null}
        </ul>
      </form>
    </>
  );
};

export default SearchBar;
