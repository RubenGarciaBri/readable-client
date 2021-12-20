import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { IoNotificationsSharp } from 'react-icons/io5';
import { FaComment, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useOutsideClick from '../../utils/helpers';
import { markNotificationsRead } from '../../redux/store/notifications/actions';

const NotificationsDropdown = ({ notifications, dispatch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const node = useRef();

  let unreadNotifications;
  const unreadNotificationIds = [];

  if (notifications && notifications.length > 0) {
    unreadNotifications = notifications.filter(notif => notif.read === false);
    unreadNotifications.forEach(notif => {
      unreadNotificationIds.push(notif.notificationId);
    });
  }

  useOutsideClick(node, () => {
    if (isOpen === true) {
      setIsOpen(false);
    }
  });

  const handleOpen = () => {
    setIsOpen(!isOpen);
    dispatch(markNotificationsRead(unreadNotificationIds));
  };

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <button className="navbar__right-notifications" onClick={handleOpen}>
        <IoNotificationsSharp className="navbar__right-notifications__icon" />
        {unreadNotifications && unreadNotifications.length > 0 ? (
          <span className="navbar__right-notifications__new">
            <span className="navbar__right-notifications__new-number">
              {unreadNotifications.length}
            </span>
          </span>
        ) : null}
      </button>
      {isOpen && (
        <div
          ref={node}
          className="navbar__right-notifications__dropdown shadow-slim"
        >
          <div className="navbar__right-notifications__dropdown-top">
            <span className="navbar__right-notifications__dropdown-top__span">
              Notifications
            </span>
          </div>
          <ul className="navbar__right-notifications__dropdown-list">
            {notifications && notifications.length > 0 ? (
              notifications.map(notif => {
                return (
                  <li
                    key={notif.notificationId}
                    className="navbar__right-notifications__dropdown-list__item"
                  >
                    <Link
                      to={`/posts/${notif.postId}`}
                      className={`navbar__right-notifications__dropdown-list__item-link ${
                        notif.read === false
                          ? 'navbar__right-notifications__dropdown-list__item-link--unread'
                          : ''
                      }`}
                    >
                      {notif.type === 'comment' ? (
                        <FaComment
                          size={16}
                          color={notif.read === false ? '#0275d8' : '#666'}
                        />
                      ) : (
                        <FaHeart
                          size={16}
                          color={notif.read === false ? '#dc3545' : '#666'}
                        />
                      )}{' '}
                      @{notif.sender} has{' '}
                      {notif.type === 'comment' ? 'commented on' : 'faved'} your
                      post
                    </Link>
                  </li>
                );
              })
            ) : (
              <li className="navbar__right-notifications__dropdown-list__item">
                <div className="navbar__right-notifications__dropdown-list__item-noNotifications">
                  You don&apos;t have any notifications
                </div>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

function mapStateToProps({ user }) {
  return {
    notifications: user.notifications,
  };
}

export default connect(mapStateToProps)(NotificationsDropdown);
