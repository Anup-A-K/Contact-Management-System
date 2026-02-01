# Quick Start Guide

## 🚀 Get Your Contact Management System Running in 3 Steps

### Step 1: Start MongoDB
Open PowerShell and run:
```powershell
mongod
```
Keep this terminal running. You should see: `"Waiting for connections"`

### Step 2: Start Backend (Open NEW PowerShell)
```powershell
cd "C:\Yakria Tech\Contact-Management-System\backend"
npm run dev
```

You should see:
```
✓ Connected to MongoDB
✓ Backend server running on http://localhost:5000
✓ MongoDB URI: mongodb://localhost:27017/contact-management
```

### Step 3: Start Frontend (Open NEW PowerShell)
```powershell
cd "C:\Yakria Tech\Contact-Management-System\frontend"
npm start
```

The React app will automatically open at `http://localhost:3000`

---

## ✅ Verify Everything Works

1. In the frontend, click **"Add Contact"**
2. Fill in a contact (name and email required)
3. Click **"Add Contact"** button
4. ✅ Contact appears in the list
5. The contact is now **saved in MongoDB**
6. Refresh the page → **contact still appears** (data persisted!)
7. Try editing or deleting → changes saved to MongoDB

---

## 📊 What Happens Behind the Scenes

```
YOU ADD A CONTACT IN FRONTEND
                ↓
         Fetch POST to Backend
                ↓
      Backend validates and saves to MongoDB
                ↓
      MongoDB returns the created contact
                ↓
      Backend sends response to Frontend
                ↓
      Frontend displays updated contact
                ↓
CONTACT APPEARS IN LIST & IS SAVED IN DATABASE ✓
```

---

## 🔗 Architecture

```
FRONTEND (React)          BACKEND (Express)         DATABASE (MongoDB)
http://localhost:3000  ←→  http://localhost:5000  ←→  localhost:27017
  - Add Contact              - POST /api/contacts      - Stores contacts
  - View Contacts            - GET /api/contacts       - Auto-creates DB
  - Edit Contact             - PUT /api/contacts/:id   - Persists data
  - Delete Contact           - DELETE /api/contacts/:id
```

---

## 🛠️ Terminal Layout (Recommended)

Arrange your terminals like this:

```
┌─────────────┬──────────────┬──────────────┐
│  MongoDB    │   Backend    │   Frontend   │
│  (mongod)   │  (npm run dev│ (npm start)  │
│             │              │              │
│  Listening  │  Running on  │  Running on  │
│  27017      │  5000        │  3000        │
└─────────────┴──────────────┴──────────────┘
```

---

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect to MongoDB" | Make sure `mongod` is running in step 1 |
| "Port 5000 already in use" | Close other Node apps, or use `PORT=5001 npm run dev` |
| "Frontend shows loading forever" | Check backend console for errors, ensure backend is running |
| "Contacts disappear after refresh" | MongoDB crashed - restart `mongod` in step 1 |
| "CORS error in console" | Backend might not be running - check step 2 |

---

## 💡 Pro Tips

- **Auto-reload Backend**: Backend uses `nodemon` (via `npm run dev`), so changes auto-reload
- **Check MongoDB Data**: Use MongoDB Compass (download free) to inspect database
- **Clear Data**: Delete the `contact-management` database in MongoDB to start fresh
- **Check API**: Open `http://localhost:5000/api/health` in browser for health check

---

## 🎯 You're All Set!

Your full-stack contact management system is now ready. Contacts are automatically saved to MongoDB and will persist across app restarts.

Enjoy! 🎉
