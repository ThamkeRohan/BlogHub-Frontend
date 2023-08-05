import React from 'react'
import BlogCard from '../blogCard/BlogCard.js'
import './blogList.css'
const BlogsList = ({blogs}) => {
  return (
    <div className="blogs-list">
        {
            blogs.map((blog)=><BlogCard {...blog} key={blog.id}/>)
        }
    </div>
  )
}

export default BlogsList
