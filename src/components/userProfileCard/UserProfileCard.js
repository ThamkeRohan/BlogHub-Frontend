import React from 'react'
import useAuthContext from '../../hooks/useAuthContext'
import './userProfileCard.css'
export default function UserProfileCard() {
    const { name, email, avatarPath } = useAuthContext()
  return (
    <div className="user-profile-card">
      <img src={window.location.origin + "/" + avatarPath} alt="avatar" className="avatar" />
      <div className="name">
        <span>Name: </span>
        {name}
      </div>
      <div className="email">
        <span>Email: </span>
        {email}
      </div>
    </div>
  );
}
