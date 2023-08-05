import React from 'react'
import Tag from '../tag/Tag';
import './tagsList.css'
const TagList = ({tagsMap, toggleSelectedTag}) => {
  return (
    <div className="tags-list">
      {tagsMap.map((tag) => {
        return (
          <Tag
            key={tag[0]}
            tag={tag}
            toggleSelectedTag={toggleSelectedTag}
          />
        );
      })}
    </div>
  );
}

export default TagList
