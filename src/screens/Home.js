import React from 'react';
import { connect } from 'react-redux';
import Nav from '../components/NavBar';
import Post from '../components/Posts';
import AsideUsers from '../components/AsideUsers';
import AsideCategories from '../components/AsideCategories';
import CreatePost from '../components/CreatePost';
import Footer from '../components/Footer';
import ErrorMessage from '../components/ErrorMessage';

const Home = ({ postIds, authenticated }) => {
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
            {postIds &&
              postIds.map((id) => {
                return (
                  <li key={id}>
                    <Post id={id} />
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
  ) : (
    <ErrorMessage />
  );
};

function mapStateToProps({ users, posts }) {
  return {
    users,
    posts,
    postIds: Object.keys(posts).sort(
      (a, b) => posts[b].timestamp - posts[a].timestamp
    ),
    authenticated: users.authenticated,
  };
}

export default connect(mapStateToProps)(Home);
