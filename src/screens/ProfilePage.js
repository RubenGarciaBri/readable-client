import React from 'react';
import Nav from '../components/NavBar';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  return (
    <div className='profilePage'>
      <Nav />
      <div className='profilePage-banner'></div>
      <div className='profilePage-main'>
        <div className='profileCard'>
          <div className='profileCard-top'>
            <img
              className='profileCard-top__img shadow-slim'
              src='https://i.imgur.com/AMFz23O.jpg'
            />
            <h4 className='profileCard-top__name'>@angus456</h4>
            <h5 className='profileCard-top__points'>879 Exp</h5>
            <p className='profileCard-top__bio'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              id voluptatum consequuntur ipsa sed. Ut nulla sed dignissimos qui
              quam.
            </p>
            <Link className='profileCard-top__followBtn'>Follow @angus456</Link>
          </div>
        </div>
        <div className='profileContent'>
          <h4 className='profileContent-title'>Latest Posts</h4>
          <ul className='profileContent-list'>
            <li className='profileContent-list__item'>
              <Link className='profileContent-list__item-post'>
                <h5 className='profileContent-list__item-post__title'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h5>
                <p className='profileContent-list__item-post__text'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                  tempore optio cupiditate commodi alias cumque...
                </p>
                <div className='profileContent-list__item-post__bottom'>
                  <span className='profileContent-list__item-post__bottom-category'>
                    r/sports
                  </span>
                  <span className='profileContent-list__item-post__bottom-date'>
                    8:34:AM | 2/8/2020
                  </span>
                </div>
              </Link>
              <Link className='profileContent-list__item-post'>
                <h5 className='profileContent-list__item-post__title'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h5>
                <p className='profileContent-list__item-post__text'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                  tempore optio cupiditate commodi alias cumque...
                </p>
                <div className='profileContent-list__item-post__bottom'>
                  <span className='profileContent-list__item-post__bottom-category'>
                    r/sports
                  </span>
                  <span className='profileContent-list__item-post__bottom-date'>
                    8:34:AM | 2/8/2020
                  </span>
                </div>
              </Link>
              <Link className='profileContent-list__item-post'>
                <h5 className='profileContent-list__item-post__title'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h5>
                <p className='profileContent-list__item-post__text'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                  tempore optio cupiditate commodi alias cumque...
                </p>
                <div className='profileContent-list__item-post__bottom'>
                  <span className='profileContent-list__item-post__bottom-category'>
                    r/sports
                  </span>
                  <span className='profileContent-list__item-post__bottom-date'>
                    8:34:AM | 2/8/2020
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
