import React from 'react';

const AsideMenu = ({ category, description }) => {
  return (
    <div className="asideMenu shadow-slim">
      <div className={`asideMenu-top asideMenu-top--${category}`}>
        <h5 className="asideMenu-top__title">{category}</h5>
      </div>
      <div className="asideMenu-body">
        <p className="asideMenu-body__description">{description}</p>
      </div>
    </div>
  );
};

export default AsideMenu;
