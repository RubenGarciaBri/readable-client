import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer-section">
      <div className="footer">
        <div className="footer__left">
          <h5 className="footer__left-heading">Readable</h5>
          <p className="footer__left-tex">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
            ratione incidunt nesciunt soluta adipisci quia optio delectus.
          </p>
        </div>
        <div className="footer__center">
          <ul className="footer__center-list">
            <li className="footer__center-list__item">
              <Link>Home</Link>
              <Link>Sports</Link>
              <Link>Music</Link>
              <Link>Business</Link>
            </li>
          </ul>
        </div>
        <div className="footer__right">
          <h5 className="footer__left-heading">Start posting today</h5>
          <button className="footer__left-btn">Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
