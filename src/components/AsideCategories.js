import React from 'react';
import { NavLink } from 'react-router-dom';
import navData from '../data/navData';

const AsideCategories = () => {
  return (
    <div className="asideCategories shadow-slim">
      <div className="asideCategories__top">
        <h5 className="asideCategories__top-title">Categories</h5>
      </div>
      <div className="asideCategories__body">
        <ul className="asideCategories__body-list">
          {navData.map(({ title, link, Icon }, index) => {
            return (
              <li key={index} className="asideCategories__body-list__item ">
                <NavLink
                  to={link}
                  exact
                  activeClassName="asideCategories__body-list__item-link--active"
                  className="asideCategories__body-list__item-link"
                >
                  {Icon}
                  {title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AsideCategories;
