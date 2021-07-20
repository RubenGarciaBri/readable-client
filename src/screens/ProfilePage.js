import React, { useState, useEffect } from 'react';
import Nav from '../components/NavBar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { uploadProfileImage } from '../redux/actions/user';
import { updateUserDetails } from '../redux/actions/user';
import { FaPen, FaCheck, FaCalendarAlt } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

import {
  formatDate,
  formatDateYearOnly,
  nestedIdObjectToArray,
  arrayIntoNestedIdObject,
  createExcerpt,
} from '../utils/helpers';

const ProfilePage = ({ user, posts, dispatch, profileUser }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  useEffect(() => {
    if (profileUser.userName === user.credentials.userName) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [profileUser]);

  useEffect(() => {
    setBio(profileUser.bio);
    setLocation(profileUser.location);
  }, [profileUser.bio, profileUser.location]);

  console.log(isLoggedIn);

  const { email, createdAt, imageUrl, userName } = profileUser;

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    dispatch(uploadProfileImage(formData));
  };

  const handleImageClick = () => {
    const button = document.getElementById('imageUpload');
    button.click();
  };

  const handleSubmit = () => {
    const userDetails = {
      bio,
      location,
    };
    console.log(userDetails);
    dispatch(updateUserDetails(userDetails));
  };

  const handleLocationUpdate = () => {
    setIsLocationOpen(!isLocationOpen);
    handleSubmit();
  };

  const handleBioUpdate = () => {
    setIsBioOpen(!isBioOpen);
    handleSubmit();
  };

  const loggedInMenu = () => {
    return (
      <div className='profileCard'>
        <div className='profileCard-top'>
          <div className='profileCard-top__imgWrapper'>
            <img className='shadow-slim' src={imageUrl} />
            <input
              hidden='hidden'
              type='file'
              id='imageUpload'
              onChange={handleImageChange}
            />
            <button className='profileCard-top__imgWrapper-btn'>
              <FaPen size={14} onClick={handleImageClick} />
            </button>
          </div>
          <h4 className='profileCard-top__name'>{userName}</h4>
          <p className='profileCard-top__since'>
            Member since {formatDateYearOnly(createdAt)}
          </p>
          <div>
            {isLocationOpen ? (
              <input
                type='text'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className='profileCard-top__input'
              />
            ) : (
              <p className='profileCard-top__location'>{location}</p>
            )}
            <button className='profileCard-top__editBtn'>
              {isLocationOpen ? (
                <FaCheck size={14} onClick={handleLocationUpdate} />
              ) : (
                <FaPen
                  size={14}
                  onClick={() => setIsLocationOpen(!isLocationOpen)}
                />
              )}
            </button>
          </div>

          
          <div>
            {isBioOpen ? (
              <input
                type='text'
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className='profileCard-top__input'
              />
            ) : (
              <p className='profileCard-top__bio'>{bio}</p>
            )}
            <button className='profileCard-top__editBtn'>
              {isBioOpen ? (
                <FaCheck size={14} onClick={handleBioUpdate} />
              ) : (
                <FaPen size={14} onClick={() => setIsBioOpen(!isBioOpen)} />
              )}
            </button>
          </div>
          {/* <button className='profileCard-top__deleteAccount'>
            Delete Account
          </button> */}
        </div>
      </div>
    );
  };

  const loggedOutMenu = () => {
    return (
      <div className='profileCard'>
        <div className='profileCard-top'>
          <div className='profileCard-top__imgWrapper'>
            <img className='shadow-slim' src={imageUrl} />
          </div>
          <h4 className='profileCard-top__name'>{userName}</h4>
          <div>
            {/* <MdLocationOn size={19} /> */}
            <p className='profileCard-top__location'>{location}</p>
          </div>
          <p className='profileCard-top__since'>
            Member since {formatDateYearOnly(createdAt)}
          </p>
          <div>
            <p className='profileCard-top__bio'>{bio}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='profilePage'>
      <Nav />
      <div className='profilePage-banner'></div>
      <div className='profilePage-main'>
        {isLoggedIn ? loggedInMenu() : loggedOutMenu()}
        <div className='profileContent'>
          <h4 className='profileContent-title'>Latest Posts</h4>
          <ul className='profileContent-list'>
            {posts.map((post) => {
              return (
                <li key={post.id} className='profileContent-list__item'>
                  <Link
                    to={`/posts/${post.id}`}
                    className='profileContent-list__item-post'
                  >
                    <h5 className='profileContent-list__item-post__title'>
                      {post.title}
                    </h5>
                    <p className='profileContent-list__item-post__text'>
                      {createExcerpt(post.body)}
                    </p>
                    <div className='profileContent-list__item-post__bottom'>
                      <span className='profileContent-list__item-post__bottom-category'>
                        {post.category}
                      </span>
                      <span className='profileContent-list__item-post__bottom-date'>
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ user, data }, props) {
  const { userName } = props.match.params;
  const profileUser = data.users[userName];

  const postsArray = nestedIdObjectToArray(data.posts);
  const userPosts = postsArray.filter(
    (post) => post.author === profileUser.userName
  );

  return {
    posts: userPosts,
    user,
    profileUser,
  };
}

export default connect(mapStateToProps)(ProfilePage);
