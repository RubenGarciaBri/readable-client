import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/users';

const LoginPage = ({ dispatch, user }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const userData = {
    email,
    password,
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(userData, history));
  };

  return (
    <div className='loginSection'>
      <div className='login-container main-container'>
        <div className='login shadow-xs'>
          <div className='login-card session-card'>
            <h3 className='login-card__heading'>Log in</h3>
            <form
              action=''
              className='login-card__form'
              onSubmit={(e) => onFormSubmit(e)}
            >
              <input
                type='email'
                placeholder='Email'
                className='login-card__email'
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='password'
                placeholder='Password'
                className='login-card__form-password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type='submit'
                className='login-card__form-btn shadow-slim'
              >
                Submit
              </button>
              <span className='login-card__form-account'>
                First time here? <Link to='/signup'>Create an account</Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ user }) {
  return {
    user,
  };
}

export default connect(mapStateToProps)(LoginPage);
