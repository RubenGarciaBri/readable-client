import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

export function generateId() {
  return uuidv4();
}

export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString('en-US');
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString();
}

export function formatDateYearOnly(timestamp) {
  const d = new Date(timestamp);
  return d.toLocaleDateString();
}

export function formatPost(post, author, authedUser, parentPost) {
  const { id, likes, replies, text, timestamp } = post;
  const { name, avatarURL } = author;

  return {
    name,
    id,
    timestamp,
    text,
    avatar: avatarURL,
    likes: likes.length,
    replies: replies.length,
    hasLiked: likes.includes(authedUser),
    parent: !parentPost
      ? null
      : {
          author: parentPost.author,
          id: parentPost.id,
        },
  };
}

export function arrayIntoNestedIdObject(array) {
  let object = {};
  
  array.forEach((item) => {
    object[item.id] = {
      ...item,
    };
  });
  
  return object;
};

export function nestedIdObjectToArray(obj) {
  const entriesArray = Object.entries(obj);
  let newArray = [];

  for (let i = 0; i < entriesArray.length; i++) {
    newArray.push(entriesArray[i][1]);
  }

  return newArray;
};

const useOutsideClick = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useOutsideClick;

