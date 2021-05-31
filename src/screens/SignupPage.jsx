import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

const SignupPage = () => {
  const [userName, setUserName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [errors, setErrors] = useState({})
  
  const history = useHistory()

  const newUserData = {
    userName,
    email,
    password,
    confirmPassword,
  }

  const onFormSubmit = e => {
    e.preventDefault()
    axios
      .post('http://localhost:5000/readable-bf7a6/europe-west1/api/signup', newUserData)
      .then(res => {
        console.log(res)
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        history.push('/')
      })
      .catch(err => {
        setErrors(err.response.data)
      })
  }

  return (
    <div className="signupPage">
      <div className="signup-container">
        <div className="signup shadow-xs">
          <div className="signup-card session-card">
            <h3 className="signup-card__heading">Create account</h3>
            <form action="" className="signup-card__form" onSubmit={e => onFormSubmit(e)}>
              <input type="text" placeholder="Name" className="signup-card__form-name" onChange={e => setUserName(e.target.value)}/>
              <input type="email" placeholder="Email" className="signup-card__email" onChange={e => setEmail(e.target.value)}/>
              <input type="password" placeholder="Password" className="signup-card__form-password" onChange={e => setPassword(e.target.value)}/>
              <input type="password" placeholder="Confirm password" className="signup-card__form-password" onChange={e => setConfirmPassword(e.target.value)}/>
              <button type="submit" className="signup-card__form-btn shadow-slim">Sign Up</button>
              <span className="signup-card__form-account">Already have an account? <Link to='/login'>Log
                  in</Link></span>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage