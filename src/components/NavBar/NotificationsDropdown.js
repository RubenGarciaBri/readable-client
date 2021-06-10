import React, { useState, useEffect, useRef } from 'react';
import { IoNotificationsSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import useOutsideClick from '../../utils/helpers';

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const node = useRef();

  useOutsideClick(node, () => {
    if (isOpen === true) {
      setIsOpen(false);
    }
  });

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <button
        className='navbar__right-notifications'
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoNotificationsSharp className='navbar__right-notifications__icon' />
      </button>
      {isOpen && (
        <div
          ref={node}
          className='navbar__right-notifications__dropdown shadow-slim'
        >
          <div className='navbar__right-notifications__dropdown-top'>
            <span className='navbar__right-notifications__dropdown-top__span'>
              Notifications
            </span>
          </div>
          <ul className='navbar__right-notifications__dropdown-list'>
            <li className='navbar__right-notifications__dropdown-list__item'>
              <Link className='navbar__right-notifications__dropdown-list__item-link'>
                @andre_ops has liked your post
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
