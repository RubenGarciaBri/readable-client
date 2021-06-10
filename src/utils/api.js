import axios from 'axios';
import { _savePost, _saveComment } from './_DATA.js';

export function getInitialData() {
  return Promise.all([getUsers(), getAuthedUser(), getPosts()]).then(
    ([users, authedUser, posts]) => ({
      users,
      authedUser,
      posts,
    })
  );
}

export const getUsers = async () => {
  try {
    const res = await axios.get('/users');
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAuthedUser = async () => {
  try {
    const res = await axios.get('/user');
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getPosts = async () => {
  try {
    const res = await axios.get('/posts');
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export function savePost(info) {
  return _savePost(info);
}

export function saveComment(info) {
  return _saveComment(info);
}
