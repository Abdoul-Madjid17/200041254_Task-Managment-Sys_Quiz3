import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Users = () => {
  const [newTask, setNewTask] = useState('');

  const search = useLocation().search;
  const username = new URLSearchParams(search).get('username');

  const handleTaskCreation = async (e) => {
    e.preventDefault();

    // Additional client-side validation
    if (!newTask) {
      alert('Please enter a task');
      return;
    }

    // Send task creation data to the server
    try {
      const response = await fetch('http://localhost:9000/createtask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newtask: newTask, username }),
      });

      if (response.ok) {
        alert('Task created successfully!');
        setNewTask(''); // Clear the input field after successful creation
        // You might want to fetch and update the task list here
      } else {
        const data = await response.json();
        alert(`Task creation failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during task creation:', error.message);
      alert('An error occurred during task creation');
    }
  };

  return (
    <>
      <div className='container-fluid bg-primary text-white'>
        <h1 className='head'>YOUR TODOLIST</h1>
        <div style={{ display: 'inline-block', marginLeft: '80%' }}>
          <a href='http://localhost:3000' className='btn btn-danger'>
            Logout
          </a>{' '}
        </div>
        <hr />
      </div>
      <div className='taskdiv'>
        <h3 className='tasks'>Tasks Component Goes Here</h3>
      </div>
      <div style={{ float: 'center' }}>
        <form onSubmit={handleTaskCreation} className='form-group'>
          <br />
          <div className='addtask_div'>
            <h5>Add new task:</h5>
            <input
              type='text'
              className='form-control-lg'
              name='newtask'
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button style={{ marginLeft: '2%' }} type='submit' className='btn btn-primary'>
              ADD
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Users;
