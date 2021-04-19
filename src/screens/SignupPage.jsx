import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const SignupPage = () => {
  return (
    <div class="signupPage">
      <div class="signup-container">
        <div class="signup shadow-xs">
          <div class="signup-card session-card">
            <h3 class="signup-card__heading">Create account</h3>
            <form action="" class="signup-card__form">
              <input type="text" placeholder="Name" class="signup-card__form-name"/>
              <input type="email" placeholder="Email" class="signup-card__email"/>
              <input type="password" placeholder="Password" class="signup-card__form-password"/>
              <input type="password" placeholder="Confirm password" class="signup-card__form-password"/>
              <button type="submit" class="signup-card__form-btn shadow-slim">Sign Up</button>
              <span class="signup-card__form-account">Already have an account? <Link to='/login'>Log
                  in</Link></span>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage