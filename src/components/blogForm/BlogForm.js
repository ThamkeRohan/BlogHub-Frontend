import React, { useState } from 'react'
import './blogForm.css'
import { Link, useNavigate } from 'react-router-dom';
import useMarkdownParser from '../../hooks/useMarkdownParser';
import useAuthContext from '../../hooks/useAuthContext';


export default function BlogForm({id="", imgUrl="", title="", markdown="", tags=[], handleSubmit, formType}){
    const user = useAuthContext()
    const navigate = useNavigate()
    const [blogImgUrl, setBlogImgUrl] = useState(imgUrl)
    const [blogTitle, setBlogTitle] = useState(title)
    const [blogTags, setBlogTags] = useState(tags)
    const [blogMarkdown, setBlogMarkdown] = useState(markdown)
    const [blogTag,setBlogTag] = useState("");
    const [errors, setErrors] = useState({
      imgUrlError: null,
      titleError: null,
      tagsError: null,
      markdownError: null
    })
    const blogHtml = useMarkdownParser(blogMarkdown)

    
    function addTag(){
      if(blogTag === ""){
        return;
      }
      const currentTag = blogTag;
      setBlogTag("");
      setBlogTags( prev => [...prev, currentTag] )
    }
    function removeTag(e){
      const tagToBeRemoved=e.target.previousElementSibling.innerText;
      setBlogTags((prevTags)=>{
        return prevTags.filter((tag)=>{
          return tag !== tagToBeRemoved
        })
      })
    }

    function validateImgUrl(){
      return blogImgUrl.length !== 0
    }
    function validateTitle(){
      return blogTitle.length !== 0
    }
    function validateBlogTags(){
      return blogTags.length !== 0
    }
    function validateMarkdown(){
      return blogMarkdown.length !== 0
    }
    
    
  return (
    <form
      className="blog-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (
          !(
            validateImgUrl() &&
            validateTitle() &&
            validateBlogTags() &&
            validateMarkdown()
          )
        ) {
          let foundErrors = {};
          if (!validateImgUrl()) {
            foundErrors = {
              ...foundErrors,
              imgUrlError: "Image URL is required",
            };
          }
          else{
            foundErrors = {
              ...foundErrors,
              imgUrlError: null,
            };
          }
          if (!validateTitle()) {
            foundErrors = {
              ...foundErrors,
              titleError: "Blog title is required",
            };
          } else {
            foundErrors = {
              ...foundErrors,
              titleError: null,
            };
          }
          if (!validateBlogTags()) {
            foundErrors = {
              ...foundErrors,
              tagsError: "Add atleast one tag for the blog",
            };
          } else {
            foundErrors = {
              ...foundErrors,
              tagsError: null,
            };
          }
          if (!validateMarkdown()) {
            foundErrors = {
              ...foundErrors,
              markdownError: "Markdown is required",
            };
          } else {
            foundErrors = {
              ...foundErrors,
              markdownError: null,
            };
          }
          setErrors((prevErrors) => {
            return { ...prevErrors, ...foundErrors };
          });
          return;
        }

        handleSubmit({
          id: Number(id),
          imgUrl: blogImgUrl,
          title: blogTitle,
          tags: blogTags,
          markdown: blogMarkdown,
          authorId: user.id,
          author: {
            name: user.name,
          },
        });
        navigate("/");
      }}
    >
      {blogImgUrl && (
        <div className="header-img-container">
          <img src={blogImgUrl} alt="" />
        </div>
      )}

      <div>
        <label htmlFor="img-url">Image URL</label>
        <input
          id="img-url"
          type="text"
          value={blogImgUrl}
          onChange={(e) => {
            setBlogImgUrl(e.target.value);
          }}
        />
        {errors.imgUrlError && (
          <div className="errors">{errors.imgUrlError}</div>
        )}
      </div>
      <div>
        <label htmlFor="blog-title">Title</label>
        <input
          id="blog-title"
          type="text"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
        />
        {errors.titleError && <div className="errors">{errors.titleError}</div>}
      </div>
      <div className="tags-container">
        <label htmlFor="blog-tags">Tag</label>
        <input
          id="blog-tags"
          type="text"
          value={blogTag}
          onChange={(e) => setBlogTag(e.target.value)}
        />
        <button type="button" onClick={addTag} className="action-btn">
          Add Tag
        </button>
        {errors.tagsError && <div className="errors">{errors.tagsError}</div>}
      </div>
      <div className="form-tags-list">
        {blogTags.map((tag) => {
          return (
            <div className="tag" key={tag}>
              <div className="tag-name">{tag}</div>
              <button className="remove-tag-btn" onClick={removeTag}>
                &#9747;
              </button>
            </div>
          );
        })}
      </div>
      <div className="markdown-parser-container">
        <div className="markdown-container">
          <label htmlFor="blog-markdown">Markdown</label>
          <textarea
            name=""
            id="blog-markdown"
            className="blog-markdown"
            onChange={(e) => {
              setBlogMarkdown(e.target.value);
            }}
            value={blogMarkdown}
          ></textarea>
        </div>
        <div className="preview-container">
          <label htmlFor="blog-preview">Preview</label>
          <div
            id="preview"
            className="blog-preview"
            dangerouslySetInnerHTML={{ __html: blogHtml }}
          ></div>
        </div>
        {errors.markdownError && (
          <div className="errors markdown-error">{errors.markdownError}</div>
        )}
      </div>
      <div className="btns-container">
        <Link to="/">
          <button className="action-btn" type='button'>Back</button>
        </Link>

        <button className="action-btn">
          {formType === "Create" ? "Create" : "Edit"}
        </button>
      </div>
    </form>
  );
}



