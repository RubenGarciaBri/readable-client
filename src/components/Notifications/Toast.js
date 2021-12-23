import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  FaCheck,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle,
} from 'react-icons/fa';
import { nestedIdObjectToArray } from '../../utils/helpers';
import { getAllNotificationsSelector } from '../../redux/store/notifications/selectors';

const Toast = ({ position }) => {
  const [isVisible, setIsVisible] = useState(true);

  const notificationsObj = useSelector(getAllNotificationsSelector());
  const notifications = nestedIdObjectToArray(notificationsObj);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  });

  const generateIcon = type => {
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

  const generateBgColor = type => {
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

  return (
    <div className={`notification-container ${position}`}>
      {notifications.length > 0 &&
        notifications.map(notification => {
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
              <div className="notification__img">
                {generateIcon(notification.type)}
              </div>
              <div>
                <p className="notification__title">{notification.title}</p>
                <p className="notification__message">{notification.message}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Toast;
