import React from 'react';
import SearchBar from './SearchBar';
import NotificationsDropdown from './NotificationsDropdown';
import SignoutButton from './SignoutButton';
import ProfileLink from './ProfileLink';

const Nav = () => {
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
          <ProfileLink />
          <NotificationsDropdown />
          <SignoutButton />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
