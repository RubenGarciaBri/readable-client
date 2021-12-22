import {
  SET_USER,
  SET_ERROR,
  CLEAR_ERROR,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from './types';

import axios from 'axios';

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/login', userData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERROR });
      history.push('/');
    })
    .catch(err => console.log(err));
};

export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/signup', newUserData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERROR });
      history.push('/');
      window.location.reload();
    })
    .catch(err => console.log(err));
};

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get('/user')
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

export const logoutUser = history => dispatch => {
  dispatch({ type: LOADING_USER });
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
  history.push('/');
  window.location.reload();
};

export const updateUserDetails = userDetails => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post('user', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const uploadProfileImage = formData => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post('user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};
