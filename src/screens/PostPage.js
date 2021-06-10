import React from 'react';
import { connect } from 'react-redux';
import Nav from '../components/NavBar/Nav';
import Post from '../components/Posts';

const PostPage = ({ id, postIds }) => {
  return (
    <>
      <Nav />
      <div className='postPage'>
        <div className='postPage-container'>
          {postIds
            .filter((postId) => postId === id)
            .map((p) => {
              return <Post key={p} id={p} opened={true} />;
            })}
        </div>
      </div>
    </>
  );
};

function mapStateToProps({ posts }, props) {
  const { id } = props.match.params;

  return {
    id,
    postIds: Object.keys(posts),
  };
}

export default connect(mapStateToProps)(PostPage);
