import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  getAuthedUserAuthenticatedSelector,
  getAuthedUserCredentialsSelector,
  getAuthedUserNameSelector,
} from '../../redux/store/authedUser/selectors';

const ProfileLink = () => {
  const authenticated = useSelector(getAuthedUserAuthenticatedSelector());
  const userName = useSelector(getAuthedUserNameSelector());
  const credentials = useSelector(getAuthedUserCredentialsSelector());

  return (
    <Link to={`/profile/${userName}`} className="navbar__right-profile">
      <img
        className="navbar__right-profile__userImg shadow-slim"
        src={authenticated && credentials.imageUrl}
        alt=""
      />
      <span className="navbar__right-profile__userName">
        @{authenticated && userName}
      </span>
    </Link>
  );
};

export default ProfileLink;
