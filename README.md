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

## Installation

1. Clone the repository:
   ```bash
   cd backend
   npm install
   ```

2. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```ning the Application Locally

### Starting MongoDB

Before running the backend, ensure MongoDB is running on your machine:

**Windows (PowerShell)**:
```powershell
## Running the Application

### Start MongoDB

```bash
mongod
```

### Start Backend

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:3001`

### Start Frontend

In a new terminal:

```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`─ server.js           # Express server setup and API routes
│   └── node_modules/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js          # Main app component
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── components/
│   │   │   ├── ContactForm.js    # Form for creating/editing contacts
│   │   │   └── ContactList.js    # Display contacts
│   │   └── utils/
│   │       ├── api.js            # API calls to backend
│   │       └── storage.js        # LocalStorage utilities
│   ├── package.json
│   ├── build/              # Production build (generated)
│   └── node_modules/
└── README.md
```

## Features

- **Create Contacts**: Add new contacts with name, email, phone, tags, and company
- **View Contacts**: Browse all contacts in a list with search functionality
- **Update Contacts**: Edit existing contact information
- **Delete Contacts**: Remove contacts from the system
- **Search**: Filter contacts by name, tags, company, and more
- **Recently Searched**: Track recently searched queries
- **Persistent Storage**: All data is stored in MongoDB

## API Endpoints

### Contacts
- `GET /api/contacts` - Fetch all contacts
- `POST /api/contacts` - Create a new contact
- `GET /api/contacts/:id` - Get a specific contact
- `PUT /api/contacts/:id` - Update a contact
## Features

- Create, read, update, and delete contacts
- Search contacts by name, tags, and company
- Recently searched history
- Persistent storage with MongoDB
- `npm run dev` - Run the server with nodemon (auto-reload on file changes)

### Frontend
- `npm start` - Start development server
- `npm build` - Create a production build
- `npm test` - Run tests

## License

ISC

## Support

For issues or questions, please create an issue in the repository.
