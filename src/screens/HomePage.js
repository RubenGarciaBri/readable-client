import React, { useState } from 'react';
import { connect } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/react';
import Nav from '../components/NavBar';
import Post from '../components/Posts';
import AsideMenu from '../components/AsideMenu';
import AsideCategories from '../components/AsideCategories';
import CreatePost from '../components/CreatePost';
import FilterBar from '../components/FilterBar';
import { nestedIdObjectToArray } from '../utils/helpers';
import MetaDecorator from '../utils/MetaDecorator';

const HomePage = ({ postsArr, loading }) => {
  const [filter, setFilter] = useState('latest');

  const spinnerStyles = css`
    display: block;
    margin: 50px auto;
    text-align: center;
  `;

  const onSelectChange = e => {
    setFilter(e.target.value);
  };

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
          <FilterBar onSelectChange={onSelectChange} />
          {loading === true ? (
            <BeatLoader css={spinnerStyles} loading />
          ) : (
            <ul>
              {filter === 'latest'
                ? postsArr
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map(post => {
                      return (
                        <li key={post.id}>
                          <Post id={post.id} />
                        </li>
                      );
                    })
                : filter === 'rating'
                ? postsArr
                    .sort((a, b) => b.voteScore - a.voteScore)
                    .map(post => {
                      return (
                        <li key={post.id}>
                          <Post id={post.id} />
                        </li>
                      );
                    })
                : postsArr
                    .sort((a, b) => b.commentCount - a.commentCount)
                    .map(post => {
                      return (
                        <li key={post.id}>
                          <Post id={post.id} />
                        </li>
                      );
                    })}
            </ul>
          )}
        </main>
        <aside className="categoryPage-right">
          <AsideMenu
            category="Home"
            description="This is the front page of Readable. Here you can find all the latest posts and updates from the community."
          />
        </aside>
      </div>
    </div>
  );
};

function mapStateToProps({ data }) {
  // Turn nested object into array and sort by available options
  const postsArr = nestedIdObjectToArray(data.posts);

  return {
    postsArr,
    loading: data.loading,
  };
}

export default connect(mapStateToProps)(HomePage);
