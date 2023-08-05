import React from 'react'
import './userProfileBadge.css'
export default function UserProfileBadge({ avatarPath, name }) {
  return (
    <div className='user-profile-badge'>
      <img src={window.location.origin + "/" + avatarPath} alt="" className='avatar'/>
      <span className='name'>{ name }</span>
    </div>
  )
}
