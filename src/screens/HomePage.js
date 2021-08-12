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
import Footer from '../components/Footer';
import ErrorMessage from '../components/ErrorMessage';
import { nestedIdObjectToArray } from '../utils/helpers';
import { IoNotificationsCircleOutline } from 'react-icons/io5';

const HomePage = ({
  posts,
  latestPosts,
  ratedPosts,
  commentedPosts,
  loading,
}) => {
  const [filter, setFilter] = useState('latest');

  const history = useHistory();

  const spinnerStyles = css`
    display: block;
    margin: 50px auto;
    text-align: center;
  `;

  // console.log('Latest: ', latestPosts);
  // console.log('Rating: ', ratedPosts);
  // console.log('Commented: ', commentedPosts);

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
              {latestPosts &&
                latestPosts.map((post) => {
                  return (
                    <li key={post.id}>
                      <Post id={post.id} />
                    </li>
                  );
                })}
              {/* {filter === 'latest'
                ? latestPosts.map((post) => {
                    return (
                      <li key={post.id}>
                        <Post id={post.id} />
                      </li>
                    );
                  })
                : null}
              {filter === 'rating'
                ? ratedPosts.map((post) => {
                    return (
                      <li key={post.id}>
                        <Post id={post.id} />
                      </li>
                    );
                  })
                : null} */}
              {filter === 'comments'
                ? commentedPosts.map((post) => {
                    return (
                      <li key={post.id}>
                        <Post id={post.id} />
                      </li>
                    );
                  })
                : null}
            </ul>
          )}
        </main>
        <aside className='categoryPage-right'>
          <AsideMenu
            category='Home'
            description='This is to front page of Readable. Here you can find all the latest posts and updates from the community.'
          />
        </aside>
      </div>
    </div>
  );
};

function mapStateToProps({ user, data }) {
  // Turn nested object into array and sort by available options
  const postsArr = nestedIdObjectToArray(data.posts);

  const latestPosts = postsArr.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const ratedPosts = postsArr.sort((a, b) => b.voteScore - a.voteScore);
  const commentedPosts = postsArr.sort(
    (a, b) => b.commentCount - a.commentCount
  );

  return {
    latestPosts,
    ratedPosts,
    commentedPosts,
    posts: data.posts,
    authenticated: user.authenticated,
    loading: data.loading,
  };
}

export default connect(mapStateToProps)(HomePage);
