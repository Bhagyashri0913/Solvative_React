// src/components/SearchBox.jsx
import React, { forwardRef } from 'react';
import './SearchBox.css';

const SearchBox = forwardRef(({ query, setQuery, onEnter }, ref) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onEnter();
  };

  return (
    <input
      ref={ref}
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Search places..."
      className="search-box"
    />
  );
});

export default SearchBox;