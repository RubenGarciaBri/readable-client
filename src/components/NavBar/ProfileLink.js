import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ProfileLink = ({ authenticated, imageUrl, userName }) => {
  return (
    <Link to={`/profile/${userName}`} className="navbar__right-profile">
      <img
        className="navbar__right-profile__userImg shadow-slim"
        src={authenticated && imageUrl}
        alt=""
      />
      <span className="navbar__right-profile__userName">
        @{authenticated && userName}
      </span>
    </Link>
  );
};

function mapStateToProps({ user }) {
  return {
    authenticated: user.authenticated,
    imageUrl: user.credentials.imageUrl,
    userName: user.credentials.userName,
  };
}

export default connect(mapStateToProps)(ProfileLink);
