import { generateId } from '../utils/helpers';

export let users = {
  Mike: {
    id: 'Mike',
    avatar: 'https://randomuser.me/api/portraits/men/49.jpg',
  },
  Carol: {
    id: 'Carol',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  Jennifer: {
    id: 'Jennifer',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  Victor: {
    id: 'Victor',
    avatar: 'https://randomuser.me/api/portraits/men/16.jpg',
  },
};

export let posts = {
  '01': {
    id: '01',
    title: 'Learning a second language is hard',
    body:
      "Shoutout to all the speakers I know for whom English is not a first language, but can STILL explain a concept well. It's hard enough to give a good talk in your mother tongue!",
    category: 'sports',
    author: 'sarah_edo',
    timestamp: 1518122597860,
    voteScore: 12,
    favourites: ['tylermcginnis'],
    comments: ['fap8sdxppna8oabnxljzcv', '3km0v4hf1ps92ajf4z2ytg'],
    upvotes: [],
    downvotes: [],
  },
  '02': {
    id: '02',
    title: "Something I've been thinking a lot about...",
    body:
      'The idea of best practices being a negative thing is an interesting concept.',
    category: 'business',
    author: 'eliot_13',
    timestamp: 1515044095650,
    voteScore: 7,
    favourites: ['tylermcginnis'],
    comments: [
      'fap8sdxppna8oabnxljzcv',
      '3km0v4hf1ps92ajf4z2ytg',
      '3km0v4hf1ps92a1f4zyyt3',
    ],
    upvotes: [],
    downvotes: [],
  },
  '03': {
    id: '03',
    title: "Fermi Paradox is one of the best songs I've ever listened to",
    body:
      "This group has been producing amazing songs lately, such a shame I couldn't see them in London last year. The quality just gets better and better, crazy...",
    category: 'music',
    author: 'deathmetal_87',
    timestamp: 1514044994650,
    voteScore: 21,
    favourites: ['tylermcginnis'],
    comments: [
      'fap8sdxppna8oabnxljzcv',
      '3km0v4hf1ps92ajf4z2ytg',
      '3km0v4hf1ps92a1f4zyyt3',
      'a2p8sdxppna8oabnxljzcv',
      'klp8sdxppna8oabnxljzcv',
      'faa8s1xjpna83adnxljzcv',
    ],
    upvotes: [],
    downvotes: [],
  },
};

function formatPost({ title, body, category, author }) {
  return {
    author,
    id: generateId(),
    favourites: [],
    comments: [],
    title,
    body,
    timestamp: Date.now(),
    category,
    voteScore: 0,
    upvotes: [],
    downvotes: [],
  };
}

function formatComment({ comment, postId, author }) {
  return {
    text: comment,
    author,
    postId,
    id: generateId(),
    timestamp: Date.now(),
    voteScore: 0,
  };
}

export async function _savePost({ title, body, category, author }) {
  return new Promise((res, rej) => {
    const formattedPost = formatPost({
      title,
      body,
      category,
      author,
    });
    res(formattedPost);
  });
}

export async function _saveComment({ comment, postId, author }) {
  return new Promise((res, rej) => {
    const formattedComment = formatComment({
      comment,
      postId,
      author,
    });
    res(formattedComment);
  });
}
