import React from 'react'
import './tag.css'
const Tag = ({ tag, toggleSelectedTag }) => {
  const tagName = tag[0];
  const tagCount = tag[1];

  return (
    <div className="tag" onClick={toggleSelectedTag}>
      <div className="tag-name">{tagName}</div>
      <div className="tag-count">{tagCount}</div>
    </div>
  );
};

export default Tag
