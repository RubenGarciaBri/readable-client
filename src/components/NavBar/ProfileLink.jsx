import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const ProfileLink = ({ authedUser, dispatch }) => {
  return (
    <Link to="/profile" className="navbar__right-profile">
      <img className='navbar__right-profile__userImg shadow-slim'src={authedUser && authedUser.avatar} alt=""/>
      <span className='navbar__right-profile__userName'>{authedUser && authedUser.id}
      </span>
    </Link>
  )
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(ProfileLink)