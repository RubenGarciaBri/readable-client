import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import HomePage from '../screens/HomePage';
import PostPage from '../screens/PostPage';
import SportsPage from '../screens/SportsPage';
import MusicPage from '../screens/MusicPage';
import BusinessPage from '../screens/BusinessPage';
import SignupPage from '../screens/SignupPage';
import LoginPage from '../screens/LoginPage';
import ProfilePage from '../screens/ProfilePage';
import { ToastContainer } from 'react-toastify';
import { SET_AUTHENTICATED } from '../redux/types';
import { getPosts, getUsers } from '../redux/actions/data';
import { logoutUser, getUserData } from '../redux/actions/user';
import AuthRoute from '../utils/AuthRoute';
import axios from 'axios';

axios.defaults.baseURL =
  'https://europe-west1-readable-bf7a6.cloudfunctions.net/api';

function App({ dispatch }) {
  const history = useHistory();

  // Load initial data
  useEffect(() => {
    const token = localStorage.FBIdToken;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        dispatch(logoutUser());
        history.push('/');
      } else {
        dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common['Authorization'] = token;
        dispatch(getUserData());
      }
    }
  }, []);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getUsers());
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/posts/:id" component={PostPage} />
        <Route path="/profile/:userName" component={ProfilePage} />
        <Route path="/sports" component={SportsPage} />
        <Route path="/music" component={MusicPage} />
        <Route path="/business" component={BusinessPage} />
        <AuthRoute path="/signup" component={SignupPage} />
        <AuthRoute path="/login" component={LoginPage} />
      </Switch>
      <ToastContainer
        limit={7}
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        pauseOnHover
      />
    </div>
  );
}

function mapStateToProps({ authedUser, data }) {
  return {
    authedUser,
    isLoaded: data.loading,
  };
}

export default connect(mapStateToProps)(App);
