import { LOADING_USERS, SET_USERS } from './types';
import axios from 'axios';

export const getUsers = () => dispatch => {
  axios
    .get('/users')
    .then(res => {
      dispatch({
        type: SET_USERS,
        payload: res.data,
        loading: false,
      });
    })
    .catch(err => console.log(err));
};
