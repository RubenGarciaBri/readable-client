import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import Home from '../screens/Home'
import { handleInitialData } from '../redux/actions/shared'
import PostPage from '../screens/PostPage'
import ProfilePage from '../screens/ProfilePage'
import SignupPage from '../screens/SignupPage'
import LoginPage from '../screens/LoginPage'
import { ToastContainer, toast } from 'react-toastify'
import { SET_AUTHENTICATED } from '../redux/types';
import { logoutUser, getUserData } from '../redux/actions/users';
import axios from 'axios'

axios.defaults.baseURL = 'https://europe-west1-readable-bf7a6.cloudfunctions.net/api'

function App({ dispatch }) {
  // Load initial data
  useEffect(() => {
    dispatch(handleInitialData())
  }, [])

  const token = localStorage.FBIdToken;
  if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token;
    dispatch(getUserData());
  }
}

  return (
    <div className='App'>
      <Route path='/' exact component={Home} />
      <Route path='/posts/:id' component={PostPage} />
      <Route path='/profile' component={ProfilePage} />
      <Route path='/signup' component={SignupPage} />
      <Route path='/login' component={LoginPage} />
      <ToastContainer limit={7} position='top-right' autoClose={2000} hideProgressBar={true} pauseOnHover />
    </div>
  )
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App)
