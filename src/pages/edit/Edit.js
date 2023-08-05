import React, { useEffect, useState } from 'react'
import BlogForm from '../../components/blogForm/BlogForm'
import { useParams } from 'react-router-dom'
const Edit = ({blogs, editBlog, removeHeaderImg}) => {
  const {id} = useParams()
  const [blog, setBlog] = useState(blogs.find((blog)=>blog.id === Number(id)))

  useEffect(() => {
    removeHeaderImg()
  },[])

  
  return (
    <div>
      <BlogForm
        { ...blog }
        handleSubmit = {editBlog}
        formType="Edit"
      />
    </div>
  );
}

export default Edit
