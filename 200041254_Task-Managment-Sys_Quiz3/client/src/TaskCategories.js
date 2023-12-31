import React, { useState } from 'react';

const TaskCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    // Implement logic to filter tasks based on the selected category
  };

  return (
    <div>
      <h3>Task Categories</h3>
      <label>Select Category:</label>
      <select onChange={handleCategoryChange} value={selectedCategory}>
        <option value="">All</option>
        <option value="category1">Category 1</option>
        <option value="category2">Category 2</option>
        {/* Add more categories as needed */}
      </select>
    </div>
  );
};

export default TaskCategories;
