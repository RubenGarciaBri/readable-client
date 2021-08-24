import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/user';
import { FaSignOutAlt, FaUserPlus } from 'react-icons/fa';
import { FaComment, FaHeart, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useOutsideClick from '../../utils/helpers';
import { useHistory } from 'react-router-dom';

const MobileMenu = ({ dispatch, authenticated, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();
  const node = useRef();

  useOutsideClick(node, () => {
    if (isOpen === true) {
      setIsOpen(false);
    }
  });

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const loggedInMenu = () => (
      <div
      style={{
        position: 'relative',
      }}
    >
      <button
        className='navbarMobile__right-mobileMenu'
        onClick={handleOpen}
      >
        <FaBars className='navbarMobile__right-mobileMenu__icon' />
      </button>
      {isOpen && (
        <div
          ref={node}
          className='navbarMobile__right-mobileMenu__dropdown shadow-slim'
        >
          <ul className='navbarMobile__right-mobileMenu__dropdown-list'>         
            <li
              className='navbarMobile__right-mobileMenu__dropdown-list__profile'
            >
              <Link
                to={`/profile/${user.credentials.userName}`}
                className={'navbarMobile__right-mobileMenu__dropdown-list__profile-link'}
              >
                <img
                  className='navbarMobile__right-mobileMenu__dropdown-list__profile-link__userImg shadow-slim'
                  src={authenticated && user.credentials.imageUrl}
                  alt=''
                />
                <div>
                  <span className='navbarMobile__right-mobileMenu__dropdown-list__profile-link__userName'>
                    {authenticated && user.credentials.userName}
                  </span>
                  <span className='navbarMobile__right-mobileMenu__dropdown-list__profile-link__span'>
                    See your profile
                  </span>
                </div>         
              </Link>
            </li>
            <li
              className='navbarMobile__right-mobileMenu__dropdown-list__signout'
            >
              <button
                className='navbarMobile__right-mobileMenu__dropdown-list__signout-button'
                onClick={() => dispatch(logoutUser(history))}
              > 
                <FaSignOutAlt className='navbarMobile__right-mobileMenu__dropdown-list__signout-button__icon'/>
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )

  const loggedOutMenu = () => (
    <div
    style={{
      position: 'relative',
    }}
  >
    <button
      className='navbarMobile__right-mobileMenu'
      onClick={handleOpen}
    >
      <FaBars className='navbarMobile__right-mobileMenu__icon' />
    </button>
    {isOpen && (
      <div
        ref={node}
        className='navbarMobile__right-mobileMenu__dropdown shadow-slim'
      >
        <ul className='navbarMobile__right-mobileMenu__dropdown-list'>     
          <li
            className='navbarMobile__right-mobileMenu__dropdown-list__login'
          >
            <Link
              to='/login'
              className='navbarMobile__right-mobileMenu__dropdown-list__login-button'
            > 
              <FaSignOutAlt className='navbarMobile__right-mobileMenu__dropdown-list__login-button__icon'/>
              Log In
            </Link>
          </li>    
          <li
            className='navbarMobile__right-mobileMenu__dropdown-list__signup'
          >
            <Link
              to='/signup'
              className='navbarMobile__right-mobileMenu__dropdown-list__signup-button'
            > 
              <FaUserPlus className='navbarMobile__right-mobileMenu__dropdown-list__signup-button__icon'/>
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    )}
  </div>
)
  
  
  return (
    authenticated === true ? loggedInMenu() : loggedOutMenu()
  )
}

function mapStateToProps({ user }) {
  return {
    user,
  };
}

export default connect(mapStateToProps)(MobileMenu);
