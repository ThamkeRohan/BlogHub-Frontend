import React from 'react'
import './avatars.css'
export default function Avatars({ setSelectedAvatar, selectedAvatarPath }) {
    const avatarsPath = getAvatarsPath()
    function getAvatarsPath(){
        const avatarsPath = []
        for(let i=1; i<=10; i++){
            avatarsPath.push("imgs/avatars/avatar_" + i + ".png");
        }
        return avatarsPath
    }
    
  return (
    <div className='avatars-container'>
        <label>Select Profile Image</label>
      <div className="avatars">
        {avatarsPath.map((avartarPath) => {
          return <img src={avartarPath} alt="" key={avartarPath} onClick={e => {setSelectedAvatar(avartarPath)}} className={selectedAvatarPath === avartarPath ? "active-avatar" : "inactive-avatar"} />;
        })}
      </div>
    </div>
  );
}
