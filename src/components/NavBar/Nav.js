import React from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import NotificationsDropdown from './NotificationsDropdown';
import SignoutButton from './SignoutButton';
import ProfileLink from './ProfileLink';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';

const Nav = ({ authenticated }) => {
  return (
    <nav className='navbar'>
      <div className='navbar__container main-container'>
        <div className='navbar__left'>
          <a className='logo' href='/'>
            Readable
          </a>
        </div>
        <div className='navbar__center'>
          <SearchBar />
        </div>
        <div className='navbar__right'>
          {authenticated === true ? (
            <>
              <ProfileLink />
              <NotificationsDropdown />
              <SignoutButton />
            </>
          ) : (
            <>
              <LoginButton />
              <SignupButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

function mapStateToProps({ user }) {
  return {
    authenticated: user.authenticated,
  };
}

export default connect(mapStateToProps)(Nav);
