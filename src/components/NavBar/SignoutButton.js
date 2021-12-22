import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/store/authedUser/actions';
import { FaSignOutAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const SignoutButton = ({ dispatch }) => {
  const history = useHistory();

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <button
        className="navbar__right-signout"
        onClick={() => dispatch(logoutUser(history))}
      >
        <FaSignOutAlt className="navbar__right-signout__icon" />
      </button>
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(SignoutButton);
