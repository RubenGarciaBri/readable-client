import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/user';
import { FaSignOutAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const SignoutButton = ({ authedUser, dispatch }) => {
  const history = useHistory();

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <button
        className='navbar__right-signout'
        onClick={() => dispatch(logoutUser(history))}
      >
        <FaSignOutAlt className='navbar__right-signout__icon' />
      </button>
    </div>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(SignoutButton);
