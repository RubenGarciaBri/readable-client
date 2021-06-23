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

const HomePage = ({ posts, authenticated }) => {
  const history = useHistory();

  if (authenticated !== true) {
    history.push('login');
  }

  return authenticated === true ? (
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
          category='Home'
          description='This is to front page of Readable. Here you can find all the latest posts and updates from the community.'/>
        </aside>
      </div>
    </div>
  ) : null;
};

function mapStateToProps({ user, data }) {
  // Turn nested object into array
  const postsArr = nestedIdObjectToArray(data.posts)
  // Sort from newest to oldest
  const sortedPosts = postsArr.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return {
    posts: sortedPosts,
    authenticated: user.authenticated,
  };
}

export default connect(mapStateToProps)(HomePage);
