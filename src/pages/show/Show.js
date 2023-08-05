import React, { useState, useEffect } from 'react'
import './show.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useMarkdownParser from '../../hooks/useMarkdownParser';
import useAuthContext from '../../hooks/useAuthContext';

const Show = ({blogs, removeHeaderImg, removeBlog}) => {
  const {id} = useParams();
  const user = useAuthContext()
  const [blog , setBlog] = useState(blogs.find((blog)=>{
    return blog.id === Number(id);
  }))
  const blogHtml = useMarkdownParser(blog.markdown)
  const navigate = useNavigate()

  useEffect(() => {
    removeHeaderImg();
  }, []);


  return (
    <article className="show">
      {user && user.id === blog.authorId && (
        <div>
          <Link to={`/edit/${id}`}>
            <button type="button" className="action-btn edit-btn">
              Edit
            </button>
          </Link>
          <button
            className="action-btn delete-btn"
            type="button"
            onClick={() => {
              removeBlog(Number(id));
              navigate("/");
            }}
          >
            Delete
          </button>
        </div>
      )}

      {blog.imgUrl && (
        <div className="header-img-container">
          <img src={blog.imgUrl} alt="" />
        </div>
      )}
      <h2 className='blog-title'>{blog.title}</h2>
      <div className="tags-list">
        {blog.tags.map((tag) => {
          return (
            <div className="tag" key={tag}>
              {tag}
            </div>
          );
        })}
      </div>
      <div className="extra-info">
        <div className="author">Author : {blog.author.name}</div>
        <div className="date">{blog.date}</div>
      </div>
      <div
        // className="blog-html"
        dangerouslySetInnerHTML={{ __html: blogHtml }}
      ></div>
    </article>
  );
}

export default Show
