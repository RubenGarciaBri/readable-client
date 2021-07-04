import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/user';
import { FaSignOutAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const LoginButton = ({ authedUser, dispatch }) => {
  const history = useHistory();

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <button
        className='navbar__right-login'
        onClick={() => history.push('/login')}
      >
        Log In
      </button>
    </div>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(LoginButton);
