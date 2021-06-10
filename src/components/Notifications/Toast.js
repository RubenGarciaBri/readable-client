import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import {
  FaCheck,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle,
} from 'react-icons/fa';

const Toast = ({ dispatch, notifications, position }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  });

  const generateIcon = (type) => {
    switch (type) {
      case 'DANGER':
        return <FaExclamationCircle />;
      case 'INFO':
        return <FaInfoCircle />;
      case 'WARNING':
        return <FaExclamationTriangle />;
      case 'SUCCESS':
        return <FaCheck />;
      default:
        return;
    }
  };

  const generateBgColor = (type) => {
    switch (type) {
      case 'DANGER':
        return '#d9534f';
      case 'INFO':
        return '#5cb85c';
      case 'WARNING':
        return '#f0ad4e';
      case 'SUCCESS':
        return '#5cb85c';
      default:
        return;
    }
  };

  // const props = useSpring({
  //   from: {opacity: 0},
  //   to: {opacity: 1},
  //   config: { duration: 2000 }
  //   })

  return (
    <div className={`notification-container ${position}`}>
      {notifications.length > 0
        ? notifications.map((notification, i) => {
            return (
              <div
                style={{ backgroundColor: generateBgColor(notification.type) }}
                key={notification.id}
                className={`notification toast ${
                  isVisible === true
                    ? 'notification-visible'
                    : 'notification--hidden'
                }`}
              >
                <div className='notification__img'>
                  {generateIcon(notification.type)}
                </div>
                <div>
                  <p className='notification__title'>{notification.title}</p>
                  <p className='notification__message'>
                    {notification.message}
                  </p>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

function mapStateToProps({ notifications }) {
  return {
    notifications,
  };
}

export default connect(mapStateToProps)(Toast);
