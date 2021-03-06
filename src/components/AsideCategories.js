import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBasketballBall, FaMusic, FaSuitcase } from 'react-icons/fa';

const AsideCategories = () => {
  return (
    <div className="asideCategories shadow-slim">
      <div className="asideCategories__top">
        <h5 className="asideCategories__top-title">Categories</h5>
      </div>
      <div className="asideCategories__body">
        <ul className="asideCategories__body-list">
          <li className="asideCategories__body-list__item ">
            <NavLink
              to="/"
              exact
              activeClassName="asideCategories__body-list__item-link--active"
              className="asideCategories__body-list__item-link"
            >
              <FaHome size={18} />
              Home
            </NavLink>
          </li>
          <li className="asideCategories__body-list__item">
            <NavLink
              to="/sports"
              activeClassName="asideCategories__body-list__item-link--active"
              className="asideCategories__body-list__item-link"
            >
              <FaBasketballBall size={16} />
              Sports
            </NavLink>
          </li>
          <li className="asideCategories__body-list__item">
            <NavLink
              to="/music"
              activeClassName="asideCategories__body-list__item-link--active"
              className="asideCategories__body-list__item-link"
            >
              <FaMusic size={16} />
              Music
            </NavLink>
          </li>
          <li className="asideCategories__body-list__item">
            <NavLink
              to="/business"
              activeClassName="asideCategories__body-list__item-link--active"
              className="asideCategories__body-list__item-link"
            >
              <FaSuitcase size={16} />
              Business
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AsideCategories;
