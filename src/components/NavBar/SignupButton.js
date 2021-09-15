import React from 'react';
import { useHistory } from 'react-router-dom';

const SignupButton = () => {
  const history = useHistory();

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <button
        className="navbar__right-signup"
        onClick={() => history.push('/signup')}
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignupButton;
