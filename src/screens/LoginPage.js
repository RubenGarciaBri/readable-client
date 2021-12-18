import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { spinnerStylesDefault } from '../sass/spinnerStyles';
import { loginUser } from '../redux/actions/user';
import MetaDecorator from '../utils/MetaDecorator';

const LoginPage = ({ dispatch, UI }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const history = useHistory();

  useEffect(() => {
    setErrors(UI.errors);
  }, [UI.errors]);

  const userData = {
    email,
    password,
  };

  const onFormSubmit = e => {
    e.preventDefault();
    dispatch(loginUser(userData, history));
  };

  return (
    <div className="loginSection">
      <MetaDecorator />
      <div className="login-container main-container">
        {UI.loading === true ? (
          <BeatLoader css={spinnerStylesDefault} loading />
        ) : (
          <div className="login shadow-xs">
            <div className="login-card session-card">
              <h3 className="login-card__heading">Log in</h3>
              <form
                action=""
                className="login-card__form"
                onSubmit={e => onFormSubmit(e)}
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="login-card__email"
                  onChange={e => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="login-card__form-password"
                  onChange={e => setPassword(e.target.value)}
                />
                {
                  // Return the first and unique property of the object that contains the error
                  errors && (
                    <small className="login-card__form-errors">
                      {errors[Object.keys(errors)[0]]}
                    </small>
                  )
                }
                <button
                  type="submit"
                  className="login-card__form-btn shadow-slim"
                >
                  Submit
                </button>
                <span className="login-card__form-account">
                  First time here? <Link to="/signup">Create an account</Link>
                </span>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function mapStateToProps({ UI }) {
  return {
    UI,
  };
}

export default connect(mapStateToProps)(LoginPage);
