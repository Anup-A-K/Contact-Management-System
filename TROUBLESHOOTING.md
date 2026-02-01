# Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: "Cannot connect to MongoDB"

**Symptoms:**
- Backend shows: `✗ MongoDB connection error`
- Backend terminates
- Contacts don't save

**Causes:**
- MongoDB server not running
- Wrong MONGO_URI
- MongoDB not installed
- Port 27017 in use by another app

**Solutions:**

1. **Check if MongoDB is running:**
   ```powershell
   # Windows - Check if mongod process exists
   Get-Process mongod -ErrorAction SilentlyContinue
   
   # If not running, start it
   mongod
   ```

2. **Verify MONGO_URI (if using local MongoDB):**
   ```
   MONGO_URI=mongodb://localhost:27017/contact-management
   ```

3. **Test MongoDB connection:**
   ```powershell
   mongosh
   # If this works, MongoDB is running
   exit
   ```

4. **Check port 27017:**
   ```powershell
   netstat -ano | findstr :27017
   ```

---

### Issue 2: "Port 5000 Already in Use"

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Causes:**
- Another Node app running on port 5000
- Previous backend process not fully terminated
- Windows port reserved

**Solutions:**

1. **Find process using port 5000:**
   ```powershell
   netstat -ano | findstr :5000
   ```

2. **Kill the process (replace PID with actual number):**
   ```powershell
   taskkill /PID <PID> /F
   ```

3. **Or use a different port:**
   ```powershell
   $env:PORT=5001
   npm run dev
   ```

4. **Update frontend API URL if port changed:**
   Edit `frontend/src/utils/api.js`:
   ```javascript
   const API_BASE = 'http://localhost:5001/api';
   ```

---

### Issue 3: "Frontend Shows Loading Forever"

**Symptoms:**
- Frontend stuck on "Loading contacts..."
- No contacts appear
- Browser DevTools shows network request pending

**Causes:**
- Backend not running
- Backend crashed
- Network error between frontend and backend
- Wrong API_BASE URL

**Solutions:**

1. **Verify backend is running:**
   ```powershell
   # Terminal where backend runs should show:
   ✓ Backend server running on http://localhost:5000
   ✓ Connected to MongoDB
   ```

2. **Check API endpoint directly:**
   - Open browser to: `http://localhost:5000/api/health`
   - Should see: `{"status":"ok"}`

3. **Check browser console:**
   - Press F12 in browser
   - Go to Console tab
   - Look for error messages
   - Common: "fetch failed" or CORS error

4. **Check frontend API URL:**
   Edit `frontend/src/utils/api.js` line 1:
   ```javascript
   const API_BASE = 'http://localhost:5000/api';
   ```

5. **Restart everything:**
   ```powershell
   # Terminal 1: MongoDB
   mongod
   
   # Terminal 2: Backend
   cd backend
   npm run dev
   
   # Terminal 3: Frontend
   cd frontend
   npm start
   ```

---

### Issue 4: "CORS Error in Console"

**Symptoms:**
```
Access to XMLHttpRequest at 'http://localhost:5000/api/contacts' from origin 
'http://localhost:3000' has been blocked by CORS policy
```

**Causes:**
- Backend doesn't have CORS enabled
- CORS middleware not working
- Different origin than expected

**Solutions:**

1. **Verify CORS in backend:**
   Check `backend/server.js` line ~9:
   ```javascript
   app.use(cors());
   ```

2. **Verify dependencies installed:**
   ```powershell
   cd backend
   npm install cors
   npm list cors
   ```

3. **Restart backend after any changes:**
   ```powershell
   cd backend
   npm run dev
   ```

---

### Issue 5: "Contacts Don't Save"

**Symptoms:**
- Can add contact but it disappears after refresh
- No error message
- Contact appears but doesn't persist

**Causes:**
- MongoDB not saving data
- MongoDB crashed
- Data goes to MongoDB but not returned properly

**Solutions:**

1. **Check MongoDB is running:**
   ```powershell
   mongosh
   use contact-management
   db.contacts.find()
   # Should show your contacts
   ```

2. **Check backend logs:**
   Look at terminal where backend runs for error messages

3. **Verify contact was actually saved:**
   ```powershell
   mongosh
   use contact-management
   db.contacts.countDocuments()
   # Should increase when you add contact
   ```

4. **Check frontend console:**
   - Press F12
   - Go to Console tab
   - Check for errors when adding contact

---

### Issue 6: "Contacts Disappear After Refresh"

**Symptoms:**
- Add contact, see it in list
- Refresh page with F5
- Contact is gone

**Causes:**
- Data not saved to MongoDB
- MongoDB connection lost
- Frontend not fetching from backend

**Solutions:**

1. **Verify MongoDB has the data:**
   ```powershell
   mongosh
   use contact-management
   db.contacts.find()
   ```

2. **Check MongoDB is still running:**
   If MongoDB crashed, restart it:
   ```powershell
   mongod
   ```

3. **Restart backend:**
   ```powershell
   cd backend
   npm run dev
   ```

4. **Clear browser cache:**
   - Press Ctrl+Shift+Delete
   - Clear cached images and files
   - Refresh page

---

### Issue 7: "MongoDB Atlas Connection Not Working"

**Symptoms:**
- Using MongoDB Atlas but getting connection error
- Connection string works with MongoDB Compass but not the app

**Causes:**
- Wrong connection string format
- IP not whitelisted
- Database user permissions
- Network timeout

**Solutions:**

1. **Get correct connection string from MongoDB Atlas:**
   - Dashboard → Clusters → Connect
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<username>` and `<password>`
   - Replace `<cluster-url>`

2. **Check MONGO_URI format:**
   Should be:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/contact-management
   ```

3. **Whitelist your IP:**
   - MongoDB Atlas → Network Access
   - Add your IP address or 0.0.0.0/0 (for testing only)

4. **Verify credentials:**
   - Username and password are correct
   - Special characters are URL-encoded (@, !, $ → %40, %21, %24)

5. **Set environment variable:**
   Create `backend/.env`:
   ```env
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/contact-management
   ```

---

### Issue 8: "Can't See Validation Errors"

**Symptoms:**
- Form accepts invalid data
- Trying to submit without name/email, no error shown
- Phone accepts non-digits

**Causes:**
- Frontend validation not working
- Backend validation not working
- Input clearing between renders

**Solutions:**

1. **Check browser console for JavaScript errors:**
   Press F12 → Console tab

2. **Verify form component:**
   Check `frontend/src/components/ContactForm.js` has validation

3. **Verify backend validation:**
   Check `backend/server.js` in POST endpoint:
   ```javascript
   if (!name || !email) {
     return res.status(400).json({ error: 'Name and email are required' });
   }
   ```

4. **Test in browser console:**
   ```javascript
   // Try to create contact with missing fields
   fetch('http://localhost:5000/api/contacts', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ name: 'Test' }) // Missing email
   }).then(r => r.json()).then(console.log)
   ```

---

### Issue 9: "Edit Contact Doesn't Work"

**Symptoms:**
- Click Edit, form fills with data
- Change data and click Update
- Nothing happens or error appears

**Causes:**
- Contact _id not being passed correctly
- Backend not receiving correct ID format
- Network error

**Solutions:**

1. **Check browser console:**
   - Press F12 → Console
   - Look for errors

2. **Verify contact has _id:**
   ```powershell
   mongosh
   use contact-management
   db.contacts.findOne()
   # Should show _id field
   ```

3. **Check network request:**
   - F12 → Network tab
   - Click Edit and Update
   - Look for PUT request
   - Check Status (should be 200)
   - Check Request/Response tabs

4. **Verify backend PUT endpoint:**
   ```javascript
   // Should handle PUT /api/contacts/:id
   app.put('/api/contacts/:id', async (req, res) => { ... })
   ```

---

### Issue 10: "Delete Shows Confirmation But Doesn't Delete"

**Symptoms:**
- Click Delete
- Confirm in dialog
- Contact still appears
- No error message

**Causes:**
- Backend error not reaching frontend
- Contact _id incorrect
- Network issue

**Solutions:**

1. **Check browser console for errors:**
   F12 → Console tab

2. **Check network request:**
   - F12 → Network tab
   - Click Delete
   - Find DELETE request
   - Check if Status is 200

3. **Test delete via API:**
   ```javascript
   // Get contact _id first from MongoDB
   fetch('http://localhost:5000/api/contacts/YOUR_ID_HERE', {
     method: 'DELETE'
   }).then(r => r.json()).then(console.log)
   ```

4. **Verify backend delete endpoint:**
   Check `backend/server.js` DELETE route

---

### Issue 11: "Form Validation Error: Email is Required"

**Symptoms:**
- Email field shows validation error even after typing email
- Can't submit form

**Causes:**
- Email format validation too strict
- Special characters in email
- Validation logic error

**Solutions:**

1. **Check valid email format:**
   Valid: `user@example.com`
   Invalid: `user@example` (missing TLD)
   Invalid: `@example.com` (missing local part)

2. **Check what format is expected:**
   Look at `frontend/src/components/ContactForm.js` line ~5:
   ```javascript
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   ```

3. **Test your email:**
   ```javascript
   const email = "your@email.com";
   const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   console.log(pattern.test(email)); // true = valid
   ```

---

### Issue 12: "Phone Validation Too Strict"

**Symptoms:**
- Phone field rejects valid numbers
- Can only enter numbers
- No formatting

**Causes:**
- Validation expects exactly 10 digits
- No hyphens or spaces allowed
- Country codes not supported

**Solutions:**

1. **Understand current format:**
   - Must be exactly 10 digits: `1234567890`
   - No hyphens: `123-456-7890` ❌
   - No spaces: `123 456 7890` ❌
   - No country code: `+1 123 456 7890` ❌

2. **To change format:**
   Edit `frontend/src/components/ContactForm.js` function `validatePhone()`

3. **Example: Accept hyphenated format:**
   ```javascript
   function validatePhone(phone) {
     // Accept XXX-XXX-XXXX or XXXXXXXXXX
     const phonePattern = /^(\d{3}-?\d{3}-?\d{4})$/;
     return phonePattern.test(phone);
   }
   ```

---

## Quick Diagnostics

### Check Everything with These Commands

```powershell
# 1. Check MongoDB Running
Get-Process mongod

# 2. Check MongoDB Data
mongosh
use contact-management
db.contacts.find()
exit

# 3. Check Backend Running
curl http://localhost:5000/api/health

# 4. Check Frontend Running
Start-Process http://localhost:3000

# 5. Check Backend Process
Get-Process node

# 6. Check Listening Ports
netstat -ano | findstr :5000
netstat -ano | findstr :3000
netstat -ano | findstr :27017
```

---

## Getting Help

### Information to Collect Before Asking for Help

1. **Error message** - Exact text from console
2. **When it happens** - Add/Edit/Delete/Load
3. **Terminal output** - Screenshots of each terminal
4. **Browser console errors** - F12 → Console
5. **MongoDB status** - Is mongod running?
6. **Backend logs** - What does backend terminal show?
7. **Network requests** - F12 → Network tab screenshots

### Where to Check for Errors

| Location | How to Access |
|----------|---------------|
| Frontend JavaScript errors | F12 → Console |
| Network requests/responses | F12 → Network → Click request |
| Backend console logs | Terminal where backend runs |
| MongoDB logs | Terminal where mongod runs |
| Database contents | `mongosh` → `db.contacts.find()` |

---

## Performance Tips

### If App is Slow

1. **Check MongoDB indexes:**
   ```
   Automatically indexed on _id
   Consider adding: name, email
   ```

2. **Check network latency:**
   - F12 → Network
   - Check response times
   - Should be < 100ms for local

3. **Check browser:**
   - Close unused tabs
   - Clear cache: Ctrl+Shift+Delete
   - Try different browser

4. **Check server resources:**
   - Task Manager → Performance
   - Check CPU and Memory usage

---

## Still Not Working?

Try this complete reset:

```powershell
# 1. Stop everything (Ctrl+C in each terminal)

# 2. Clear database
mongosh
use contact-management
db.dropDatabase()
exit

# 3. Clear browser data
# Ctrl+Shift+Delete → Clear all

# 4. Start fresh
mongod

# Terminal 2:
cd backend
npm run dev

# Terminal 3:
cd frontend
npm start
```

After this, you should have a completely clean system to test with!
