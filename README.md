# Contact Management System

A full-stack contact management application built with modern web technologies.

## Tech Stack

- **Frontend**: React.js, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API**: RESTful API with JSON
- **Package Manager**: npm

## Steps to Run Locally

### Prerequisites
- Node.js installed
- MongoDB installed and running
- npm (comes with Node.js)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

You should see:
```
✓ Backend server running on http://localhost:5000
✓ Connected to MongoDB
```

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend application:
```bash
npm start
```

The frontend will automatically open at `http://localhost:3000`

### MongoDB Setup

Ensure MongoDB is running before starting the backend:
```bash
mongod
```

## Features

- ✅ Add, edit, and delete contacts
- ✅ Search contacts by name, email, company, or tags
- ✅ Persistent storage in MongoDB
- ✅ Real-time synchronization between frontend and backend
- ✅ Input validation
- ✅ Responsive design
- ✅ Alphabetical sorting of contacts

## API Endpoints

- `GET /api/contacts` - Retrieve all contacts
- `GET /api/contacts/:id` - Retrieve a single contact
- `POST /api/contacts` - Create a new contact
- `PUT /api/contacts/:id` - Update a contact
- `DELETE /api/contacts/:id` - Delete a contact
- `GET /api/health` - Health check
