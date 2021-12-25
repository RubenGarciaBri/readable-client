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
  getAllPostsSelector,
  getPostLoadingSelector,
  getFilteredPostsSelector,
} from '../redux/store/posts/selectors';

const Page = ({ category }) => {
  const [filter, setFilter] = useState('latest');
  const dispatch = useDispatch();

  // Values from the Redux Store
  const postsArray = category
    ? useSelector(getFilteredPostsSelector(category))
    : useSelector(getAllPostsSelector());
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
                ? postsArray
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map(post => {
                      return (
                        <li key={post.id}>
                          <Post stateId={post.id} />
                        </li>
                      );
                    })
                : filter === 'rating'
                ? postsArray
                    .sort((a, b) => b.voteScore - a.voteScore)
                    .map(post => {
                      return (
                        <li key={post.id}>
                          <Post id={post.id} />
                        </li>
                      );
                    })
                : postsArray
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
      </div>
    </div>
  );
};

export default Page;
