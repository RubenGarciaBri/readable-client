import React from 'react';
import { connect } from 'react-redux';
import Nav from '../components/NavBar/Nav';
import OpenedPost from '../components/Posts/OpenedPost';

const PostPage = ({ id, postIds }) => {
  return (
    <>
      <Nav />
      <div className='postPage'>
        <div className='postPage-container'>
          {postIds
            .filter((postId) => postId === id)
            .map((p) => {
              return <OpenedPost key={p} id={p} />;
            })}
        </div>
      </div>
    </>
  );
};

function mapStateToProps({ data }, props) {
  const { id } = props.match.params;

  return {
    id,
    postIds: Object.keys(data.posts),
  };
}

export default connect(mapStateToProps)(PostPage);
