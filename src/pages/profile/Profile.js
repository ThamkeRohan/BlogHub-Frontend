import React, { useEffect, useState } from 'react'
import UserProfileCard from '../../components/userProfileCard/UserProfileCard'
import BlogsList from '../../components/blogsList/BlogsList'
import useAuthContext from '../../hooks/useAuthContext'
import './profile.css'
const Profile = ({ removeHeaderImg, blogs }) => {
  const [userBlogs, setUserBlogs] = useState([])
  const {id: userId} = useAuthContext() 
  function getUserBlogs(){
    const blogsForCurrentUser = blogs.filter(blog => blog.authorId === userId )
    setUserBlogs(blogsForCurrentUser)
  }
  useEffect(() => {
    removeHeaderImg()
    getUserBlogs()
  },[])
  return (
    <div className='profile'>
      <UserProfileCard />
      <h3 className='sub-heading'>Your Blogs</h3>
      {userBlogs && <BlogsList blogs={userBlogs} />}
    </div>
  );
}

export default Profile
