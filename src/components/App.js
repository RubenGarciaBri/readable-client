import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/data'
import { useHistory } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import Home from '../screens/Home';
import PostPage from '../screens/PostPage';
import ProfilePage from '../screens/ProfilePage';
import SignupPage from '../screens/SignupPage';
import LoginPage from '../screens/LoginPage';
import { ToastContainer, toast } from 'react-toastify';
import { SET_AUTHENTICATED } from '../redux/types';
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
        history.push('/login')
      } else {
        dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common['Authorization'] = token;
        dispatch(getUserData());
        dispatch(getPosts())
      }
    }

  }, []);

  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/posts/:id' component={PostPage} />
        <Route path='/profile' component={ProfilePage} />
        <AuthRoute path='/signup' component={SignupPage} />
        <AuthRoute path='/login' component={LoginPage} />
      </Switch>
      <ToastContainer
          limit={7}
          position='top-right'
          autoClose={2000}
          hideProgressBar={true}
          pauseOnHover
        />
    </div>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
