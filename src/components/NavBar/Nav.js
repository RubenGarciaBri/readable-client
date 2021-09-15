import React from 'react';
import { connect } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/react';
import SearchBar from './SearchBar';
import NotificationsDropdown from './NotificationsDropdown';
import SignoutButton from './SignoutButton';
import MobileMenu from './MobileMenu';
import ProfileLink from './ProfileLink';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';

const Nav = ({ authenticated, loading }) => {
  const spinnerStyles = css`
    display: block;
    margin: 0 auto;
    text-align: center;
  `;

  return (
    <>
      {/* Default Navbar Desktop */}
      <nav className="navbar">
        <div className="navbar__container main-container">
          <div className="navbar__left">
            <a className="logo" href="/">
              Readable
            </a>
          </div>
          <div className="navbar__center">
            <SearchBar />
          </div>
          <div className="navbar__right">
            {loading === true ? (
              <BeatLoader css={spinnerStyles} size={10} loading />
            ) : authenticated === true ? (
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

      {/* Navbar Mobile */}
      <nav className="navbarMobile">
        <div className="navbarMobile__container main-container">
          <div className="navbarMobile__left">
            <a className="logo" href="/">
              Readable
            </a>
          </div>
          <div className="navbarMobile__center">
            <SearchBar />
          </div>
          <div className="navbarMobile__right">
            {loading === true ? (
              <BeatLoader css={spinnerStyles} size={10} loading />
            ) : authenticated === true ? (
              <>
                <NotificationsDropdown />
                <MobileMenu authenticated={true} />
              </>
            ) : (
              <MobileMenu authenticated={false} />
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

function mapStateToProps({ user }) {
  return {
    authenticated: user.authenticated,
    loading: user.loading,
  };
}

export default connect(mapStateToProps)(Nav);
