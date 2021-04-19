import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from '../screens/Home'
import { handleInitialData } from '../actions/shared'
import PostPage from '../screens/PostPage'
import ProfilePage from '../screens/ProfilePage'
import SignupPage from '../screens/SignupPage'
import LoginPage from '../screens/LoginPage'
import { ToastContainer, toast } from 'react-toastify';

function App({ dispatch }) {
  // Load initial data
  useEffect(() => {
    dispatch(handleInitialData())
  }, [])

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
