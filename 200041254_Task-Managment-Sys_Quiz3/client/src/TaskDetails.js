import React from 'react';

const TaskDetails = ({ task, onClose }) => {
  return (
    <div>
      <h3>Task Details</h3>
      <p>Title: {task.title}</p>
      <p>Description: {task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <p>Priority: {task.priority}</p>

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default TaskDetails;
