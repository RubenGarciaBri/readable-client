import React, { useState, useEffect } from 'react';
import Nav from '../components/NavBar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { uploadProfileImage } from '../redux/actions/user';
import Pagination from '../components/Pagination'
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

const ProfilePage = ({ user, posts, dispatch, isLoaded, data}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  let userPosts;

  const profileUser = data.users && data.users.length > 0 ? data.users[userName] : ''

  const postsArray = nestedIdObjectToArray(data.posts);

  userPosts = postsArray.filter(
    (post) => post.author === profileUser.userName)

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  
  useEffect(() => {
    if (profileUser) {
      if (profileUser.userName === user.credentials.userName) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
  }, [profileUser]);

  useEffect(() => {
    if (profileUser) {
      setBio(profileUser.bio);
      setLocation(profileUser.location);
    }
  }, [profileUser]);

  // const { email, createdAt, imageUrl, userName } = profileUser;
  const email = profileUser && profileUser.length > 0 ? profileUser.email : ''
  const createdAt = profileUser && profileUser.length > 0 ? profileUser.createdAt : ''
  const imageUrl = profileUser && profileUser.length > 0 ? profileUser.imageUrl : ''
  const userName = profileUser && profileUser.length > 0 ? profileUser.userName : ''
  
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
                  value={isLocationOpen}
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
      )
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
      )
  };

  return (
    isLoaded === false ? null 
    : (
      <div className='profilePage'>
      <Nav />
      <div className='profilePage-banner'></div>
      <div className='profilePage-main'>
        {isLoggedIn ? loggedInMenu() : loggedOutMenu()}
        <div className='profileContent'>
          <h4 className='profileContent-title'>Latest Posts</h4>
          <ul className='profileContent-list'>
            {currentPosts.map((post) => {
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
          {posts.length > 5 ? (
            <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            currentPage={currentPage}
            paginate={paginate}
          />
          ) : null}
        </div>
      </div>
    </div>
    )   
  )
};

function mapStateToProps({ user, data, UI }, props) {
  const { userName } = props.match.params;

  

  return {
    user,
    isLoaded: data.loading,
    data
  };
}

export default connect(mapStateToProps)(ProfilePage);
