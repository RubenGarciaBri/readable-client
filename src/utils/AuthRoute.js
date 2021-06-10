import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => {
  console.log(authenticated);
  
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
};

function mapStateToProps({ users }) {
  return {
    authenticated: users.authenticated
  };
}

export default connect(mapStateToProps)(AuthRoute);
