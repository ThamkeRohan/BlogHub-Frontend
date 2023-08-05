import React, { useEffect, useState } from 'react'
import BlogsList from '../../components/blogsList/BlogsList.js';
import FilterSection from '../../components/filterSection/FilterSection.js';
import './home.css';

const Home = ({blogs, showHeaderImg}) => {
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    showHeaderImg()
  },[])

  useEffect(()=>{
      setFilteredBlogs(blogs);
  },[blogs])

  return (
    <>
      <section className="blogs-container">
        <FilterSection setFilteredBlogs={setFilteredBlogs} blogs={blogs} />
        <BlogsList blogs={filteredBlogs} />
      </section>
    </>
  );
}

export default Home
