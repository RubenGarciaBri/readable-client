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

const ProfilePage = ({ user, posts, dispatch }) => {
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  useEffect(() => {
    setBio(user.credentials.bio);
    setLocation(user.credentials.location);
  }, [user.credentials.bio, user.credentials.location]);

  const { email, createdAt, imageUrl, userName } = user.credentials;

  const postsArray = nestedIdObjectToArray(posts);
  const userPosts = postsArray.filter(
    (post) => post.author === user.credentials.userName
  );

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

  return (
    <div className='profilePage'>
      <Nav />
      <div className='profilePage-banner'></div>
      <div className='profilePage-main'>
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
            <div>
              {/* <MdLocationOn size={19} /> */}
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

            <p className='profileCard-top__since'>
              Member since {formatDateYearOnly(createdAt)}
            </p>
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

            {/* <Link className='profileCard-top__followBtn'>
              Follow {userName}
            </Link> */}
          </div>
        </div>
        <div className='profileContent'>
          <h4 className='profileContent-title'>Latest Posts</h4>
          <ul className='profileContent-list'>
            {postsArray.map((post) => {
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

function mapStateToProps({ user, data }) {
  return {
    posts: data.posts,
    user,
  };
}

export default connect(mapStateToProps)(ProfilePage);
