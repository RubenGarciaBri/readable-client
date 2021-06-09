import {
  RECEIVE_USERS,
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ
} from '../types'
import axios from 'axios'

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    payload: {
      users
    }  
  }
}

export const loginUser = (userData, history) => (dispatch) => {
  axios
  .post('/login', userData)
  .then((res) => {
    setAuthorizationHeader(res.data.token)
    dispatch(getUserData())
    dispatch({ type: CLEAR_ERRORS})
    history.push('/')
  })
  .catch((err) => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  })
}

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/signup', newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};


const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};