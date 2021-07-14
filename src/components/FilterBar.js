import React from 'react';

const FilterBar = ({ onSelectChange }) => {
  return (
    <div className='filterBar'>
      <label for='filters'>Sort by </label>
      <select name='filters' id='filters' onChange={onSelectChange}>
        <option value='latest'>Latest Posts</option>
        <option value='rating'>Highest Rating</option>
        <option value='comments'>Most Comments</option>
      </select>
    </div>
  );
};

export default FilterBar;
