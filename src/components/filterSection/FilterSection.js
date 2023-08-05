import React, { useEffect, useState } from 'react'
import TagList from '../tagsList/TagsList';
import SearchByTitle from '../searchByTitle/SearchByTitle';

const FilterForm = ({setFilteredBlogs,blogs}) => {
  const [blogTitle, setBlogTitle] = useState("")
  const [tagsMap, setTagsMap] = useState([])
  const [selectedTags,setSelectedTags] = useState([])
  
  useEffect(() => {
    setTagsMap(Array.from(getTagsMap()))
  },[blogs])

  useEffect(() => {
    searchByTags()
  },[selectedTags])

  function updateTitle(e){
    e.preventDefault()
    setBlogTitle(e.target.value)
  }

  function searchByTitle(){
    let filteredBlogs = blogs.filter(blog => {
      return blog.title.toLowerCase().includes(blogTitle.trim().toLowerCase())
    })
    setFilteredBlogs(filteredBlogs)
  }

  function searchByTags(){
    if(selectedTags.length === 0){
      return setFilteredBlogs(blogs)
    }
    let filteredBlogs = blogs.filter(blog => {
      let doesIncludes = false;
      for(let i=0; i<selectedTags.length; i++){
        if(blog.tags.includes(selectedTags[i])){
          doesIncludes= true;
          break;
        }
      }
      return doesIncludes;
    })
    setFilteredBlogs(filteredBlogs);
  }

  function toggleSelectedTag(e){
    e.target.classList.toggle("selected-tag")
    let newSelectedTags = []
    if(selectedTags.includes(e.target.innerText)){
      newSelectedTags = selectedTags.filter((selectedTag) => {
        return selectedTag !== e.target.innerText;
      });
    }else{
      newSelectedTags = [...selectedTags, e.target.innerText];
    }
    setSelectedTags(newSelectedTags)
  }

  function getTagsMap(){
    const tagsMap = new Map();
    for(let i=0; i<blogs.length; i++){
      for(let j=0; j<blogs[i].tags.length; j++){
        const tagName = blogs[i].tags[j];
        if(tagsMap.has(tagName)){
          const curretCount = tagsMap.get(tagName);
          tagsMap.set(tagName,curretCount + 1);
        }
        else{
          tagsMap.set(tagName, 1);
        }
      }
    }
    return tagsMap
  }

  return (
    <div className="filter-section">
      <SearchByTitle blogTitle={blogTitle} updateTitle={updateTitle} searchByTitle={searchByTitle} />
      <TagList toggleSelectedTag={toggleSelectedTag} tagsMap={tagsMap}/>
    </div>
  );
}

export default FilterForm
