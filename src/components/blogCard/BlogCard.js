import React from 'react'
import { Link } from 'react-router-dom'
import './blogCard.css'
const BlogCard = ({id, imgUrl, title, date, tags, markdown}) => {
  return (
      <article className="blog-card">
        
        <div className="img-container">
          <img src={imgUrl} alt="" />
        </div>
        <div className="blog-info">
          <h3 className='title'>{title}</h3>
          <div className='date'>{date}</div>
          <div className="tags-list">
            {tags.map((tag) => {
              return <div className="tag" key={tag}>{tag}</div>;
            })}
          </div>
          <p className="markdown">
            {markdown}
            <div className="card-cover"></div>
          </p>
        </div>
        
        <Link to={`/show/${id}`}>
            <button className='read-more-btn'>Read More</button>
        </Link>
        
        
      </article>
    
  );
}

export default BlogCard
