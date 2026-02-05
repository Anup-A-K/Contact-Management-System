# Contact Management System

A full-stack contact management application with a React frontend and Express.js backend, powered by MongoDB.

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB with Mongoose
- **Frontend**: React, Create React App
- **Database**: MongoDB
- **Package Manager**: npm

## Prerequisites

- Node.js
- MongoDB
- npm

## Installation

1. Install backend dependencies:
   ```powershell
   cd backend
   npm install
   ```

2. Install frontend dependencies:
   ```powershell
   cd frontend
   npm install
   ```

## Running the Application

### Start MongoDB

```powershell
mongod
```

### Start Backend

```powershell
cd backend
npm start
```

The backend will run on `http://localhost:5000`

### Start Frontend

In a new terminal:

```powershell
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`

## Features


- Create, read, update, and delete contacts
- Persistent storage with MongoDB

## Quick Start with start.bat

For Windows users, there is a convenient `start.bat` script that automates the startup process:

1. Ensure MongoDB is running
2. Double-click `start.bat` in the project root directory
3. Two command windows will open automatically:
   - One running the backend server (http://localhost:5000)
   - One running the frontend development server (http://localhost:3000)

This script eliminates the need to open multiple terminals manually.
- `npm start` - Run the server with nodemon (auto-reload on file changes)

### Frontend
- `npm start` - Start development server
- `npm build` - Create a production build
