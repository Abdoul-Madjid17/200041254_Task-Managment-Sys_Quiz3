import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Createacc = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();

    // Additional client-side validation
    if (!username || !password || !confirmpassword) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== confirmpassword) {
      alert('Passwords do not match');
      return;
    }

    // Send registration data to the server for further processing
    try {
      const response = await fetch('http://localhost:9000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert('Registration successful! Check your email for verification.');
        // Redirect or navigate to another page if needed
      } else {
        const data = await response.json();
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      alert('An error occurred during registration');
    }
  };

  return (
    <html>
      <body>
        <br />
        <form className="form-group" onSubmit={handleRegistration}>
          Enter your username:
          <input
            type="text"
            onInput={(e) => setUsername(e.target.value)}
            className="form-control-lg"
            name="username"
            value={username}
          />
          <br />
          Enter your password:
          <input
            type="password"
            onInput={(e) => setPassword(e.target.value)}
            className="form-control-lg"
            name="password"
            value={password}
          />
          <br />
          Confirm your password:
          <input
            type="password"
            onInput={(e) => setConfirmPassword(e.target.value)}
            className="form-control-lg"
            name="confirmpassword"
            value={confirmpassword}
          />
          <br />
          <button className="btn btn-danger" type="submit">
            Create
          </button>
          <button
            style={{ marginLeft: '10%' }}
            className="btn btn-danger"
            onClick={(e) => {
              e.preventDefault();
              setUsername('');
              setPassword('');
              setConfirmPassword('');
            }}
          >
            Clear
          </button>
          <Link to="/" style={{ marginLeft: '13%' }} className="btn btn-danger">
            Back
          </Link>
        </form>
      </body>
    </html>
  );
};

export default Createacc;
