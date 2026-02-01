# Contact Management System

A full-stack contact management application with Express.js backend and React frontend, using MongoDB for data persistence.

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

## Setup Instructions

### 1. Install MongoDB

#### Option A: Local MongoDB
```bash
# Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
# Then start the MongoDB service
mongod
```

#### Option B: MongoDB Atlas (Cloud)
- Create a free account at https://www.mongodb.com/cloud/atlas
- Create a cluster and get your connection string
- Set the `MONGO_URI` environment variable (see Backend Setup below)

---

### 2. Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The backend will run on `http://localhost:5000`

You should see:
```
✓ Connected to MongoDB
✓ Backend server running on http://localhost:5000
✓ MongoDB URI: mongodb://localhost:27017/contact-management
```

---

### 3. Frontend Setup

1. Navigate to the frontend folder (in a new terminal):
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will automatically open at `http://localhost:3000`

---

## API Endpoints

The backend provides the following REST API endpoints:

### Get all contacts
```
GET /api/contacts
```
Returns an array of all contacts, sorted by creation date (newest first).

### Get single contact
```
GET /api/contacts/:id
```
Returns a single contact by MongoDB `_id`.

### Create contact
```
POST /api/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "company": "Acme Corp",
  "tags": ["important", "vip"]
}
```

### Update contact
```
PUT /api/contacts/:id
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "9876543210",
  "company": "Tech Inc",
  "tags": ["friend"]
}
```

### Delete contact
```
DELETE /api/contacts/:id
```

### Health check
```
GET /api/health
```

---

## How It Works

1. **Frontend Load**: When the React app starts, it automatically fetches all contacts from the backend API
2. **Database**: All contacts are stored in MongoDB
3. **Auto-Sync**: 
   - Adding a contact: Saves to MongoDB and updates the frontend
   - Editing a contact: Updates MongoDB and reflects in the frontend
   - Deleting a contact: Removes from MongoDB and the frontend
4. **Error Handling**: The app displays error messages if the backend is unavailable

---

## Environment Variables

### Backend

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/contact-management
```

If using MongoDB Atlas, your `MONGO_URI` will look like:
```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/contact-management
```

---

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running (`mongod`)
- Check the `MONGO_URI` is correct
- Verify network connection if using MongoDB Atlas

### Port Already in Use
- Backend: Change `PORT` in `.env` or use `PORT=5001 npm start`
- Frontend: Use `PORT=3001 npm start`

### CORS Error
- Backend CORS is configured to accept localhost
- For production, update the `cors()` middleware in `server.js`

### Contacts not loading
- Ensure backend is running on port 5000
- Check browser console for error messages
- Verify MongoDB is accessible

---

## Project Structure

```
Contact-Management-System/
├── backend/
│   ├── server.js          # Express server with MongoDB integration
│   ├── package.json
│   └── node_modules/
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main app component with API calls
│   │   ├── components/
│   │   │   ├── ContactForm.js
│   │   │   └── ContactList.js
│   │   └── utils/
│   │       └── api.js     # REST API client
│   ├── package.json
│   └── node_modules/
└── README.md
```

---

## Technologies

- **Backend**: Express.js, Mongoose, MongoDB
- **Frontend**: React, Fetch API
- **Communication**: REST API with JSON
- **Database**: MongoDB

---

## Features

✅ Add, edit, and delete contacts
✅ Search contacts by name, email, company, or tags
✅ Persistent storage in MongoDB
✅ Real-time sync between frontend and backend
✅ Input validation (email format, phone number)
✅ Responsive design
✅ Error handling and user feedback
