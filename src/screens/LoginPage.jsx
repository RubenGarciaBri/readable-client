import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div class="loginSection">
      <div class="login-container main-container">
        <div class="login shadow-xs">
          <div class="login-card session-card">
            <h3 class="login-card__heading">Log in</h3>
            <form action="" class="login-card__form">
              <input type="email" placeholder="Email" class="login-card__email"/>
              <input type="password" placeholder="Password" class="login-card__form-password"/>
              <button type="submit" class="login-card__form-btn shadow-slim">Submit</button>
              <span class="login-card__form-account">First time here? <Link to='/signup'>Create an account</Link></span>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
