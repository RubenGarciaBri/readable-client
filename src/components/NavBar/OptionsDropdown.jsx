import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FaQuestionCircle, FaCog, FaUserCircle } from "react-icons/fa"
import { IoNotificationsSharp } from 'react-icons/io5'
import { VscTriangleDown } from "react-icons/vsc"
import useOutsideClick from '../../utils/helpers'

const OptionsDropdown = ({ authedUser, dispatch }) => {
  const [isOpen, setIsOpen] = useState(false)

  const node = useRef()

  useOutsideClick(node, () => {
    if (isOpen === true) {
      setIsOpen(false)
    }
  })

  return (
    <div style={{
      position: 'relative'
    }}>
      <button className="navbar__right-options" onClick={e => setIsOpen(!isOpen)}>
        <VscTriangleDown className="navbar__right-options__icon"/>
      </button>
      {isOpen && ( 
          <div ref={node} className="navbar__right-options__dropdown shadow-slim">
            <div className="navbar__right-options__dropdown-top">
              <div className="navbar__right-options__dropdown-top__left">
               <img src={authedUser && authedUser.avatar}  className="navbar__right-options__dropdown-top__left-img shadow-slim" alt=""/>
              </div>
              <div className="navbar__right-options__dropdown-top__right">
                <span className="navbar__right-options__dropdown-top__right-name">{authedUser && authedUser.id}</span>
                <Link className="navbar__right-options__dropdown-top__right-profile">See your profile</Link>
              </div> 
            </div>
            <ul className="navbar__right-options__dropdown-list">
              <li className="navbar__right-options__dropdown-list__item">
                <Link className="navbar__right-options__dropdown-list__item-link">
                  <FaQuestionCircle className="navbar__right-options__dropdown-list__item-link__icon"/>
                  <span>Help</span>
                </Link>
              </li>
              <li className="navbar__right-options__dropdown-list__item">
                <Link className="navbar__right-options__dropdown-list__item-link">
                  <FaCog className="navbar__right-options__dropdown-list__item-link__icon"/>
                  <span>Settings</span>
                </Link>
              </li>
              <li className="navbar__right-options__dropdown-list__item">
                <Link className="navbar__right-options__dropdown-list__item-link">
                  <FaUserCircle className="navbar__right-options__dropdown-list__item-link__icon" />
                  <span>Logout | Change user</span>
                </Link>
              </li>
            </ul>  
          </div>     
        )
      }    
    </div>
  )
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(OptionsDropdown)
