import React from 'react';
import { Link } from 'react-router-dom';

const ErrorMessage = () => {
  return (
    <div className="error-message">
      <p>
        You don&apos;t have permission to see this. Please log in before
        proceeding.
      </p>
      <Link to="/login">Log in</Link>
    </div>
  );
};

export default ErrorMessage;
