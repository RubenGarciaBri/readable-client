import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { spinnerStylesDefault } from '../sass/spinnerStyles';
import Nav from '../components/NavBar';
import Post from '../components/Posts';
import AsideMenu from '../components/AsideMenu';
import AsideCategories from '../components/AsideCategories';
import CreatePost from '../components/CreatePost';
import FilterBar from '../components/FilterBar';
import MetaDecorator from '../utils/MetaDecorator';
import {
  getAllPostIdsSelector,
  getPostLoadingSelector,
} from '../redux/store/posts/selectors';

const HomePage = () => {
  const [filter, setFilter] = useState('latest');
  const dispatch = useDispatch();

  // Values from the Redux Store
  const postIdsArray = useSelector(getAllPostIdsSelector());
  const loading = useSelector(getPostLoadingSelector());

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
            <BeatLoader css={spinnerStylesDefault} loading />
          ) : (
            <ul>
              {filter === 'latest'
                ? postIdsArray
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map(postId => {
                      return (
                        <li key={postId}>
                          <Post stateId={postId} />
                        </li>
                      );
                    })
                : filter === 'rating'
                ? postIdsArray
                    .sort((a, b) => b.voteScore - a.voteScore)
                    .map(postId => {
                      return (
                        <li key={postId}>
                          <Post id={postId} />
                        </li>
                      );
                    })
                : postIdsArray
                    .sort((a, b) => b.commentCount - a.commentCount)
                    .map(postId => {
                      return (
                        <li key={postId}>
                          <Post id={postId} />
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

export default HomePage;
