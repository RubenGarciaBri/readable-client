import React from 'react';
import Nav from '../components/NavBar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatDateYearOnly } from '../utils/helpers';

const ProfilePage = ({ user, posts}) => {

  const {
    bio,
    email,
    createdAt,
    location,
    imageUrl,
    userName
  } = user.credentials

  return (
    <div className='profilePage'>
      <Nav />
      <div className='profilePage-banner'></div>
      <div className='profilePage-main'>
        <div className='profileCard'>
          <div className='profileCard-top'>
            <img
              className='profileCard-top__img shadow-slim'
              src={imageUrl}
            />
            <h4 className='profileCard-top__name'>{userName}</h4>
            <h5 className='profileCard-top__points'>Member since {formatDateYearOnly(createdAt)}</h5>
            <p className='profileCard-top__bio'>{bio}</p>
            <Link className='profileCard-top__followBtn'>Follow {userName}</Link>
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

function mapStateToProps({ user, data }) {
  return {
    posts: data.posts,
    user,
  };
}

export default connect(mapStateToProps)(ProfilePage);
