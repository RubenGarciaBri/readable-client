import React, { useState, useEffect } from 'react';
import Nav from '../components/NavBar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { spinnerStylesDefault } from '../sass/spinnerStyles';
import Pagination from '../components/Pagination';
import {
  updateUserDetails,
  uploadProfileImage,
} from '../redux/store/authedUser/actions';
import { FaPen, FaCheck } from 'react-icons/fa';
import MetaDecorator from '../utils/MetaDecorator';

import {
  formatDate,
  formatDateYearOnly,
  nestedIdObjectToArray,
  createExcerpt,
} from '../utils/helpers';

const ProfilePage = ({ user, dispatch, isLoading, data, profileUser }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const postsArray = nestedIdObjectToArray(data.posts);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    if (profileUser !== undefined) {
      // Set data in component state
      setBio(profileUser.bio);
      setLocation(profileUser.location);

      // Get profile user posts in an array
      setUserPosts(
        postsArray.filter(post => post.author === profileUser.userName)
      );

      // Detect if the profile user is logged in
      if (profileUser.userName === user.credentials.userName) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
  }, [profileUser, data, user]);

  // const email = profileUser !== undefined ? profileUser.email : '';
  const createdAt = profileUser !== undefined ? profileUser.createdAt : '';
  const imageUrl = profileUser !== undefined ? profileUser.imageUrl : '';
  const userName = profileUser !== undefined ? profileUser.userName : '';

  const handleImageChange = e => {
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
      <div className="profileCard">
        <div className="profileCard-top">
          <div className="profileCard-top__imgWrapper">
            <img className="shadow-slim" src={imageUrl} />
            <input
              hidden="hidden"
              type="file"
              id="imageUpload"
              onChange={handleImageChange}
            />
            <button className="profileCard-top__imgWrapper-btn">
              <FaPen size={14} onClick={handleImageClick} />
            </button>
          </div>
          <h4 className="profileCard-top__name">@{userName}</h4>
          <p className="profileCard-top__since">
            Member since {formatDateYearOnly(createdAt)}
          </p>
          <div>
            {isLocationOpen ? (
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="profileCard-top__input"
              />
            ) : (
              <p className="profileCard-top__location">{location}</p>
            )}
            <button className="profileCard-top__editBtn">
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
                type="text"
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="profileCard-top__input"
              />
            ) : (
              <p className="profileCard-top__bio">{bio}</p>
            )}
            <button className="profileCard-top__editBtn">
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
      <div className="profileCard">
        <div className="profileCard-top">
          <div className="profileCard-top__imgWrapper">
            <img className="shadow-slim" src={imageUrl} />
          </div>
          <h4 className="profileCard-top__name">@{userName}</h4>
          <div>
            {/* <MdLocationOn size={19} /> */}
            <p className="profileCard-top__location">{location}</p>
          </div>
          <p className="profileCard-top__since">
            Member since {formatDateYearOnly(createdAt)}
          </p>
          <div>
            <p className="profileCard-top__bio">{bio}</p>
          </div>
        </div>
      </div>
    );
  };

  return isLoading === true ? (
    <BeatLoader css={spinnerStylesDefault} loading />
  ) : (
    <div className="profilePage">
      <MetaDecorator />
      <Nav />
      <div className="profilePage-banner"></div>
      <div className="profilePage-main">
        {isLoggedIn ? loggedInMenu() : loggedOutMenu()}
        <div className="profileContent">
          <h4 className="profileContent-title">Latest Posts</h4>
          <ul className="profileContent-list">
            {currentPosts.map(post => {
              return (
                <li key={post.id} className="profileContent-list__item">
                  <Link
                    to={`/posts/${post.id}`}
                    className="profileContent-list__item-post"
                  >
                    <h5 className="profileContent-list__item-post__title">
                      {post.title}
                    </h5>
                    <p className="profileContent-list__item-post__text">
                      {createExcerpt(post.body)}
                    </p>
                    <div className="profileContent-list__item-post__bottom">
                      <span className="profileContent-list__item-post__bottom-category">
                        {post.category}
                      </span>
                      <span className="profileContent-list__item-post__bottom-date">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={userPosts.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ user, data }, props) {
  const { userName } = props.match.params;
  const profileUser = data.users[userName];

  return {
    user,
    isLoading: data.loading,
    data,
    profileUser,
  };
}

export default connect(mapStateToProps)(ProfilePage);
