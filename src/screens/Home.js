import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/data';
import { useHistory } from 'react-router-dom';
import Nav from '../components/NavBar';
import Post from '../components/Posts';
import AsideUsers from '../components/AsideUsers';
import AsideCategories from '../components/AsideCategories';
import CreatePost from '../components/CreatePost';
import Footer from '../components/Footer';
import ErrorMessage from '../components/ErrorMessage';
import { arrayIntoNestedIdObject } from '../utils/helpers';
import { nestedIdObjectToArray } from '../utils/helpers';

const Home = ({ posts, authenticated }) => {
  const history = useHistory();

  if (authenticated !== true) {
    history.push('login');
  }

  const postsArray = nestedIdObjectToArray(posts);
  const sortedPosts = postsArray.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return authenticated === true ? (
    <div className='home'>
      <Nav />
      <div className='home-container'>
        <aside class='home-left'>
          <AsideCategories />
        </aside>
        <main className='home-main'>
          <CreatePost />
          <ul>
            {sortedPosts &&
              sortedPosts.map((post) => {
                return (
                  <li key={post.id}>
                    <Post id={post.id} />
                  </li>
                );
              })}
          </ul>
        </main>
        <aside className='home-right'>
          <AsideUsers />
        </aside>
      </div>
    </div>
  ) : null;
};

function mapStateToProps({ user, data }) {
  return {
    posts: data.posts,
    authenticated: user.authenticated,
  };
}

export default connect(mapStateToProps)(Home);
