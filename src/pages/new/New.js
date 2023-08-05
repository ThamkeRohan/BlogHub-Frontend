import React, { useEffect } from 'react'
import BlogForm from '../../components/blogForm/BlogForm'

export default function New({addNewBlog, removeHeaderImg}){

  useEffect(() => {
    removeHeaderImg();
  }, []);

  return (
      <BlogForm handleSubmit={addNewBlog} formType="Create" />
  );
}


