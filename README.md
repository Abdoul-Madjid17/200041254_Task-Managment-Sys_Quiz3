# Task Management System

This is a Task Management web application built using Node.js, Express.js, React, MongoDB, and JWT authentication.

## Features

- **User Authentication:**
  - User registration with email verification.
  - Different user roles (e.g., admin, regular user).
  - User login using JWT (JSON Web Tokens).
  - Password hashing for security.

- **Task Management:**
  - Create, Read, Update, and Delete (CRUD) operations for tasks.
  - Tasks include details such as title, description, due date, and priority.

- **Task List:**
  - Display a list of tasks with sorting and filtering options based on priority or due date.

- **Task Details:**
  - View detailed information about a task.
  - Edit task details.
  - Mark tasks as completed.
  - Delete tasks.

- **Task Categories:**
  - Categorize tasks into different categories.

- **Search and Filters:**
  - Search feature to find specific tasks.
  - Filters to easily sort tasks based on criteria.

## Technology Stack

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB

- **Frontend:**
  - React

- **Authentication:**
  - JWT (JSON Web Tokens)


## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Abdoul-Madjid17/200041254_Task-MS_Quiz3.git
  ``` 

2. **Start the server:**
  
  ```bash
   cd your-task-app/server
   npm install
   
   cd your-task-app/client
   npm install

   PORT=9000
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   ```

### Running the App

1. **Start the MongoDB server:**

   ```bash
   mongod
   ```

2. **Start the server:**

   ```bash
   cd your-task-app/server
   npm start
   ```

3. **Start the client in a new terminal:**

   ```bash
   cd your-task-app/client
   npm start
   ```

4. **Visit [http://localhost:3000](http://localhost:3000) in your browser to use the Task Management App.**






   
