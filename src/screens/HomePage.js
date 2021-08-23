import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/react';
import Nav from '../components/NavBar';
import Post from '../components/Posts';
import AsideMenu from '../components/AsideMenu';
import AsideCategories from '../components/AsideCategories';
import CreatePost from '../components/CreatePost';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination'
import Footer from '../components/Footer';
import ErrorMessage from '../components/ErrorMessage';
import { nestedIdObjectToArray } from '../utils/helpers';
import { IoNotificationsCircleOutline } from 'react-icons/io5';

const HomePage = ({
  postsArr,
  loading,
}) => {
  const [filter, setFilter] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const history = useHistory();

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postsArr.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const spinnerStyles = css`
    display: block;
    margin: 50px auto;
    text-align: center;
  `;

  const onSelectChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className='categoryPage'>
      <Nav />
      <div className='categoryPage-container'>
        <aside className='categoryPage-left'>
          <AsideCategories />
        </aside>
        <main className='categoryPage-main'>
          <CreatePost />
          <FilterBar onSelectChange={onSelectChange} />
          {loading === true ? (
            <BeatLoader css={spinnerStyles} loading />
          ) : (
            <ul>
              {filter === 'latest'
                ? currentPosts.sort(
                  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                ).map((post) => {
                    return (
                      <li key={post.id}>
                        <Post id={post.id} />
                      </li>
                    );
                  })
                : filter === 'rating'
                ? currentPosts.sort((a, b) => b.voteScore - a.voteScore)
                .map((post) => {
                    return (
                      <li key={post.id}>
                        <Post id={post.id} />
                      </li>
                    );
                  })
                : currentPosts.sort(
                  (a, b) => b.commentCount - a.commentCount
                ).map((post) => {
                    return (
                      <li key={post.id}>
                        <Post id={post.id} />
                      </li>
                    );
                  })}
            </ul>  
          )}
          {postsArr.length > 10 ? (
            <Pagination
            postsPerPage={postsPerPage}
            totalPosts={postsArr.length}
            currentPage={currentPage}
            paginate={paginate}
          />
          ) : null} 
        </main>
        <aside className='categoryPage-right'>
          <AsideMenu
            category='Home'
            description='This is the front page of Readable. Here you can find all the latest posts and updates from the community.'
          />
        </aside>
      </div>
    </div>
  );
};

function mapStateToProps({ user, data }) {
  // Turn nested object into array and sort by available options
  const postsArr = nestedIdObjectToArray(data.posts);

  return {
    postsArr,
    authenticated: user.authenticated,
    loading: data.loading,
  };
}

export default connect(mapStateToProps)(HomePage);
