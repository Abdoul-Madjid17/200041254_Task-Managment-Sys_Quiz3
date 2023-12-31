import React, { useState } from 'react';

const Loginform = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Additional client-side validation
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    // Send login data to the server for authentication
    try {
      const response = await fetch('http://localhost:9000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Save the JWT token to localStorage or secure storage
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        // Redirect or navigate to another page if needed
      } else {
        alert('Incorrect username/password');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('An error occurred during login');
    }
  };

  return (
    <>
      <div className="container-fluid pt-4 bg-primary text-white" style={{ marginBottom: -7 }}>
        <center>
          <h1>WELCOME TO TASK MANAGEMENT TOOL</h1>
          <br />
          <h5>The ultimate tool to manage your tasks</h5>
          <br></br>
        </center>
      </div>

      <div className="container-fluid pt-3 bg-info text-white" style={{ paddingBottom: 100 }}>
        <center>
          <img src={require('./images/index.jpg')} />
          <form
            onSubmit={handleLogin}
            autoComplete="off"
            style={{ display: 'inline-block', marginTop: -200 }}
            className="form-group"
          >
            Username<br />{' '}
            <input
              className="form-control-lg"
              onInput={(e) => setUsername(e.target.value)}
              type="text"
              name="username"
            />
            <br />
            <br />
            Password<br />{' '}
            <input
              className="form-control-lg"
              onInput={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
            />
            <br />
            <br />
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </form>
          <p>New user? Click below to create an account</p>

          <a href="/createacc">
            {' '}
            <button className="btn btn-primary">Create Account</button>
          </a>
        </center>
        <h1>{username}</h1>
      </div>
    </>
  );
};

export default Loginform;
