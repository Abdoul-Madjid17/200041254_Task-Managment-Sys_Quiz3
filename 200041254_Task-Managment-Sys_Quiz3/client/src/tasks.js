import React, { useState, useEffect } from 'react';
import TaskDetails from 'TaskDetails';
import TaskCategories from 'TaskCategories';

const TaskList = ({ username }) => {
  const [tasks, setTasks] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    // Fetch tasks for the user from the server
    fetch(`http://localhost:9000/tasks?username=${username}`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, [username]);

  useEffect(() => {
    // Sort tasks based on the selected criteria
    const sorted = [...tasks];

    if (filter === 'priority') {
      sorted.sort((a, b) => a.priority - b.priority);
    } else if (filter === 'dueDate') {
      sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    setSortedTasks(sorted);
  }, [tasks, filter]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleTaskClose = () => {
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId) => {
    // Send delete request to the server
    fetch(`http://localhost:9000/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        // Remove the deleted task from the state
        setTasks(tasks.filter((task) => task._id !== taskId));
        setSortedTasks(sortedTasks.filter((task) => task._id !== taskId));
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  return (
    <>
      <div>
        <label>Sort by:</label>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="">--Select--</option>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>

      <div>
        <h3>Task List</h3>
        <ul>
          {sortedTasks.map((task) => (
            <li key={task._id} onClick={() => handleTaskClick(task)}>
              {task.title}
              <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {selectedTask && (
        <TaskDetails task={selectedTask} onClose={handleTaskClose} />
      )}

      <TaskCategories />
    </>
  );
};

export default TaskList;
