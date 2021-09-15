import React from 'react';
import { useHistory } from 'react-router-dom';

const LoginButton = () => {
  const history = useHistory();

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <button
        className="navbar__right-login"
        onClick={() => history.push('/login')}
      >
        Log In
      </button>
    </div>
  );
};

export default LoginButton;
