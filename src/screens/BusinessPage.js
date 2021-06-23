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

const BusinessPage = ({ posts, authenticated }) => {
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
          category='Business'
          description='Our especial space for all the aspiring business people and entrepreneurs out there who make things happen.'/>
        </aside>
      </div>
    </div>
  ) : null;
};

function mapStateToProps({ user, data }) {
  // Turn nested object into array
  const postsArr = nestedIdObjectToArray(data.posts)
  // Filter by correct category
  const filteredPosts = postsArr.filter(post => post.category === 'business')
  // Sort from newest to oldest
  const sortedPosts = filteredPosts.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return {
    posts: sortedPosts,
    authenticated: user.authenticated,
  };
}

export default connect(mapStateToProps)(BusinessPage)
