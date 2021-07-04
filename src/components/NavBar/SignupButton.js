import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/user';
import { FaSignOutAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const SignupButton = ({ authedUser, dispatch }) => {
  const history = useHistory();

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <button
        className='navbar__right-signup'
        onClick={() => history.push('/signup')}
      >
        Sign Up
      </button>
    </div>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(SignupButton);
