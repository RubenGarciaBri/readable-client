import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Nav from '../components/NavBar';
import Post from '../components/Posts';
import AsideMenu from '../components/AsideMenu';
import AsideCategories from '../components/AsideCategories';
import CreatePost from '../components/CreatePost';
import FilterBar from '../components/FilterBar';
import Footer from '../components/Footer';
import ErrorMessage from '../components/ErrorMessage';
import { nestedIdObjectToArray } from '../utils/helpers';

const HomePage = ({ posts, latestPosts, ratedPosts, commentedPosts }) => {
  const [filter, setFilter] = useState('latest');

  const history = useHistory();

  console.log('Latest: ', latestPosts);
  console.log('Rating: ', ratedPosts);
  console.log('Commented: ', commentedPosts);

  console.log(filter);

  const onSelectChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className='categoryPage'>
      <Nav />
      <div className='categoryPage-container'>
        <aside class='categoryPage-left'>
          <AsideCategories />
        </aside>
        <main className='categoryPage-main'>
          <CreatePost />
          <FilterBar onSelectChange={onSelectChange} />
          <ul>
            {filter === 'latest'
              ? latestPosts.map((post) => {
                  return (
                    <li key={post.id}>
                      <Post id={post.id} />
                    </li>
                    // <p>Latest</p>
                  );
                })
              : filter === 'rating'
              ? ratedPosts.map((post) => {
                  return (
                    <li key={post.id}>
                      <Post id={post.id} />
                    </li>
                    // <p>Rating</p>
                  );
                })
              : commentedPosts.map((post) => {
                  return (
                    <li key={post.id}>
                      <Post id={post.id} />
                    </li>
                    // <p>Commented</p>
                  );
                })}
          </ul>
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
    authenticated: user.authenticated,
  };
}

export default connect(mapStateToProps)(HomePage);
