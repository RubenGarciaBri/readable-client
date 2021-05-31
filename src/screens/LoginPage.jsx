import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

const LoginPage = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [errors, setErrors] = useState({})

  const history = useHistory()

  const userData = {
    email,
    password
  }

  const onFormSubmit = e => {
    e.preventDefault()
    axios
      .post('http://localhost:5000/readable-bf7a6/europe-west1/api/login', userData)
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
    <div className="loginSection">
      <div className="login-container main-container">
        <div className="login shadow-xs">
          <div className="login-card session-card">
            <h3 className="login-card__heading">Log in</h3>
            <form action="" className="login-card__form" onSubmit={e => onFormSubmit(e)}>
              <input type="email" placeholder="Email" className="login-card__email" onChange={e => setEmail(e.target.value)}/>
              <input type="password" placeholder="Password" className="login-card__form-password" onChange={e => setPassword(e.target.value)}/>
              <button type="submit" className="login-card__form-btn shadow-slim">Submit</button>
              <span className="login-card__form-account">First time here? <Link to='/signup'>Create an account</Link></span>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
