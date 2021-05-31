import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import { FaSignOutAlt } from "react-icons/fa"


const SignoutButton = ({ authedUser, dispatch }) => {
  
  return (
    <div style={{
      position: 'relative'
    }}>
      <button className="navbar__right-signout">
        <FaSignOutAlt className="navbar__right-signout__icon"/>
      </button>
    </div>
  )
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(SignoutButton)
