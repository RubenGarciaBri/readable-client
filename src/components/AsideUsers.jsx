import React from 'react'


const AsideUsers = () => {
  return (
    <div className="asideUsers shadow-slim">
      <div className="asideUsers-top">
        <h5 className="asideUsers-top__title">Most active users</h5>
      </div>
      <div className="asideUsers-body">
        <ul className="asideUsers-body__list">
          <li className="asideUsers-body__list-item">
            <span className="asideUsers-body__list-item__score">1</span>
            <img className='asideUsers-body__list-item__userImg shadow-slim'src="https://randomuser.me/api/portraits/men/8.jpg" alt=""/>
            <span className='asideUsers-body__list-item__userName'>luishTop</span>
          </li>
          <li className="asideUsers-body__list-item">
            <span className="asideUsers-body__list-item__score">2</span>
            <img className='asideUsers-body__list-item__userImg shadow-slim'src="https://randomuser.me/api/portraits/men/22.jpg" alt=""/>
            <span className='asideUsers-body__list-item__userName'>eyowdGamer</span>
          </li>
          <li className="asideUsers-body__list-item">
            <span className="asideUsers-body__list-item__score">3</span>
            <img className='asideUsers-body__list-item__userImg shadow-slim'src="https://randomuser.me/api/portraits/women/8.jpg" alt=""/>
            <span className='asideUsers-body__list-item__userName'>angiesg93</span>
          </li>
        </ul>
        <a href="#" className='asideUsers-body__btn'>Show All</a>
      </div>
    </div>
  )
}

export default AsideUsers
