import React from 'react';
import { connect } from 'react-redux';
import Nav from '../components/NavBar';
import Post from '../components/Posts';
import AsideMenu from '../components/AsideMenu';
import AsideCategories from '../components/AsideCategories';
import CreatePost from '../components/CreatePost';
import { nestedIdObjectToArray } from '../utils/helpers';
import MetaDecorator from '../utils/MetaDecorator';

const MusicPage = ({ posts }) => {
  return (
    <div className="categoryPage">
      <MetaDecorator />
      <Nav />
      <div className="categoryPage-container">
        <aside className="categoryPage-left">
          <AsideCategories />
        </aside>
        <main className="categoryPage-main">
          <CreatePost />
          <ul>
            {posts &&
              posts.map(post => {
                return (
                  <li key={post.id}>
                    <Post id={post.id} />
                  </li>
                );
              })}
          </ul>
        </main>
        <aside className="categoryPage-right">
          <AsideMenu
            category="Music"
            description="The latest news about the music industry at your fingerprints. What are you waiting for? Join the conversation!"
          />
        </aside>
      </div>
    </div>
  );
};

function mapStateToProps({ data }) {
  // Turn nested object into array
  const postsArr = nestedIdObjectToArray(data.posts);
  // Filter by correct category
  const filteredPosts = postsArr.filter(post => post.category === 'music');
  // Sort from newest to oldest
  const sortedPosts = filteredPosts.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return {
    posts: sortedPosts,
  };
}

export default connect(mapStateToProps)(MusicPage);
