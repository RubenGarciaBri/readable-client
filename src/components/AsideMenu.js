import React from 'react';

const AsideMenu = ({ category, description }) => {
  return (
    <div className='asideMenu shadow-slim'>
      <div className={`asideMenu-top asideMenu-top--${category}`}>
        <h5 className='asideMenu-top__title'>{category}</h5>
      </div>
      <div className='asideMenu-body'>

        <p className='asideMenu-body__description'>{description}</p>

        {/* <ul className='asideMenu-body__list'>
          <li className='asideMenu-body__list-item'>
            <span className='asideMenu-body__list-item__score'>1</span>
            <img
              className='asideMenu-body__list-item__userImg shadow-slim'
              src='https://randomuser.me/api/portraits/men/8.jpg'
              alt=''
            />
            <span className='asideMenu-body__list-item__userName'>
              luishTop
            </span>
          </li>
          <li className='asideMenu-body__list-item'>
            <span className='asideMenu-body__list-item__score'>2</span>
            <img
              className='asideMenu-body__list-item__userImg shadow-slim'
              src='https://randomuser.me/api/portraits/men/22.jpg'
              alt=''
            />
            <span className='asideMenu-body__list-item__userName'>
              eyowdGamer
            </span>
          </li>
          <li className='asideMenu-body__list-item'>
            <span className='asideMenu-body__list-item__score'>3</span>
            <img
              className='asideMenu-body__list-item__userImg shadow-slim'
              src='https://randomuser.me/api/portraits/women/8.jpg'
              alt=''
            />
            <span className='asideMenu-body__list-item__userName'>
              angiesg93
            </span>
          </li>
        </ul>
        <a href='#' className='asideMenu-body__btn'>
          Show All
        </a> */}
      </div>
    </div>
  );
};

export default AsideMenu;
