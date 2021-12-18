import React from 'react';
import { connect } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { spinnerStylesNav } from '../../sass/spinnerStyles';
import SearchBar from './SearchBar';
import NotificationsDropdown from './NotificationsDropdown';
import SignoutButton from './SignoutButton';
import MobileMenu from './MobileMenu';
import ProfileLink from './ProfileLink';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';

const Nav = ({ authenticated, loading }) => {
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
            {loading ? (
              <BeatLoader css={spinnerStylesNav} size={10} loading />
            ) : authenticated ? (
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
              <BeatLoader css={spinnerStylesNav} size={10} loading />
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
