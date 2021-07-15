import React from 'react';
import { connect } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/react';
import SearchBar from './SearchBar';
import NotificationsDropdown from './NotificationsDropdown';
import SignoutButton from './SignoutButton';
import ProfileLink from './ProfileLink';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';

const Nav = ({ authenticated, loading }) => {
  const spinnerStyles = css`
    display: block;
    margin: 50px auto;
    text-align: center;
  `;

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
          {loading === true ? null : authenticated === true ? (
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

function mapStateToProps({ user, data }) {
  return {
    authenticated: user.authenticated,
    loading: data.loading,
  };
}

export default connect(mapStateToProps)(Nav);
