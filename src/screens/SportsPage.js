import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Nav from '../components/NavBar';
import Post from '../components/Posts';
import AsideMenu from '../components/AsideMenu';
import AsideCategories from '../components/AsideCategories';
import CreatePost from '../components/CreatePost';
import Footer from '../components/Footer';
import ErrorMessage from '../components/ErrorMessage';
import { nestedIdObjectToArray } from '../utils/helpers';

const SportsPage = ({ posts, authenticated }) => {
  const history = useHistory();

  return (
    <div className='categoryPage'>
      <Nav />
      <div className='categoryPage-container'>
        <aside class='categoryPage-left'>
          <AsideCategories />
        </aside>
        <main className='categoryPage-main'>
          <CreatePost />
          <ul>
            {posts &&
              posts.map((post) => {
                return (
                  <li key={post.id}>
                    <Post id={post.id} />
                  </li>
                );
              })}
          </ul>
        </main>
        <aside className='categoryPage-right'>
          <AsideMenu
            category='Sports'
            description='The space for every sports enthusiast. From football to weightlifting, here is where the discussion is happening.'
          />
        </aside>
      </div>
    </div>
  );
};

function mapStateToProps({ user, data }) {
  // Turn nested object into array
  const postsArr = nestedIdObjectToArray(data.posts);
  // Filter by correct category
  const filteredPosts = postsArr.filter((post) => post.category === 'sports');
  // Sort from newest to oldest
  const sortedPosts = filteredPosts.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return {
    posts: sortedPosts,
    authenticated: user.authenticated,
  };
}

export default connect(mapStateToProps)(SportsPage);
