import React from 'react';
import { useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { spinnerStylesNav } from '../../sass/spinnerStyles';
import SearchBar from './SearchBar';
import NotificationsDropdown from './NotificationsDropdown';
import SignoutButton from './SignoutButton';
import MobileMenu from './MobileMenu';
import ProfileLink from './ProfileLink';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import {
  getAuthedUserAuthenticatedSelector,
  getAuthedUserLoadingSelector,
} from '../../redux/store/authedUser/selectors';

const Nav = () => {
  // Values from the Redux Store
  const authenticated = useSelector(getAuthedUserAuthenticatedSelector());
  const loading = useSelector(getAuthedUserLoadingSelector());

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
    </>
  );
};

export default Nav;
