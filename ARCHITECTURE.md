# System Architecture Diagram

## High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        YOUR BROWSER                              │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │             React Frontend (localhost:3000)               │  │
│  │                                                            │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │  App.js - Main Component                             │ │  │
│  │  │  - State: contacts[], editing, loading, error        │ │  │
│  │  │  - useEffect: Load contacts on mount                 │ │  │
│  │  │  - handleSave, handleEdit, handleDelete              │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  │                        ↓                                   │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │  Components:                                         │ │  │
│  │  │  - ContactForm.js - Add/Edit contacts               │ │  │
│  │  │  - ContactList.js - Display contacts                │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  │                        ↓                                   │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │  Utils:                                              │ │  │
│  │  │  - api.js (NEW!) - REST API client functions         │ │  │
│  │  │    • fetchContacts()                                 │ │  │
│  │  │    • createContact()                                 │ │  │
│  │  │    • updateContact()                                 │ │  │
│  │  │    • deleteContact()                                 │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ╔════════════════════════════════════════════════════════════╗  │
│  ║  FETCH REQUESTS (HTTP JSON)                              ║  │
│  ║  GET /api/contacts                                       ║  │
│  ║  POST /api/contacts                                      ║  │
│  ║  PUT /api/contacts/:id                                   ║  │
│  ║  DELETE /api/contacts/:id                                ║  │
│  ╚════════════════════════════════════════════════════════════╝  │
└──────────────────────────────────────────────────────────────────┘
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│                    BACKEND SERVER                                │
│          (Node.js + Express - localhost:5000)                   │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  server.js - Main Express Application                      │  │
│  │  - CORS enabled for frontend                              │  │
│  │  - JSON middleware                                        │  │
│  │  - MongoDB connection                                     │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  REST API Endpoints                                        │  │
│  │                                                            │  │
│  │  GET /api/contacts                                        │  │
│  │  ├─ Query MongoDB                                         │  │
│  │  └─ Return array of contacts                              │  │
│  │                                                            │  │
│  │  GET /api/contacts/:id                                    │  │
│  │  ├─ Find by MongoDB _id                                   │  │
│  │  └─ Return single contact                                 │  │
│  │                                                            │  │
│  │  POST /api/contacts                                       │  │
│  │  ├─ Validate (name & email required)                      │  │
│  │  ├─ Save to MongoDB                                       │  │
│  │  └─ Return created contact with _id                       │  │
│  │                                                            │  │
│  │  PUT /api/contacts/:id                                    │  │
│  │  ├─ Validate input                                        │  │
│  │  ├─ Update MongoDB document                               │  │
│  │  └─ Return updated contact                                │  │
│  │                                                            │  │
│  │  DELETE /api/contacts/:id                                 │  │
│  │  ├─ Remove from MongoDB                                   │  │
│  │  └─ Return success message                                │  │
│  │                                                            │  │
│  │  GET /api/health                                          │  │
│  │  └─ Return { status: "ok" }                               │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Contact Schema (Mongoose)                                 │  │
│  │  - name: String (required)                                │  │
│  │  - email: String (required)                               │  │
│  │  - phone: String                                          │  │
│  │  - company: String                                        │  │
│  │  - tags: [String]                                         │  │
│  │  - createdAt: Date (auto)                                 │  │
│  │  - updatedAt: Date (auto)                                 │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
                             ↓
                  ╔═══════════════════════╗
                  ║   MongoDB Database    ║
                  ║  (localhost:27017)    ║
                  ╠═══════════════════════╣
                  ║ Database:             ║
                  ║ contact-management    ║
                  ║                       ║
                  ║ Collection:           ║
                  ║ contacts              ║
                  ║                       ║
                  ║ Documents:            ║
                  ║ {_id, name, email...} ║
                  ║ {_id, name, email...} ║
                  ║ {_id, name, email...} ║
                  ║       ...              ║
                  ╚═══════════════════════╝
```

## Data Flow Examples

### 1. Load Contacts on App Start

```
App Mounts
    ↓
useEffect() triggered
    ↓
fetchContacts() called (api.js)
    ↓
Fetch GET /api/contacts
    ↓
Backend receives request
    ↓
Contact.find() from MongoDB
    ↓
MongoDB returns array of contacts
    ↓
Backend sends JSON response
    ↓
Frontend receives JSON array
    ↓
setContacts(data)
    ↓
UI renders contact list
```

### 2. Add New Contact

```
User fills form and clicks "Add Contact"
    ↓
handleSubmit() validates input
    ↓
createContact(contactData) called (api.js)
    ↓
Fetch POST /api/contacts with JSON body
    ↓
Backend validates (name & email required)
    ↓
new Contact(data) creates instance
    ↓
contact.save() to MongoDB
    ↓
MongoDB generates _id and saves document
    ↓
Backend sends created contact back (with _id)
    ↓
Frontend receives response
    ↓
setContacts([newContact, ...prev])
    ↓
UI updates: new contact appears in list
    ↓
Contact is now persisted in MongoDB ✓
```

### 3. Edit Contact

```
User clicks Edit button
    ↓
handleEdit() loads contact into form
    ↓
User modifies fields
    ↓
User clicks "Update Contact"
    ↓
handleSubmit() validates
    ↓
updateContact(id, updatedData) called
    ↓
Fetch PUT /api/contacts/:id with JSON body
    ↓
Backend validates
    ↓
Contact.findByIdAndUpdate(id, data, {new: true})
    ↓
MongoDB updates document
    ↓
Backend returns updated contact
    ↓
Frontend updates state
    ↓
UI re-renders with changes
```

### 4. Delete Contact

```
User clicks Delete button
    ↓
Confirmation dialog appears
    ↓
User confirms
    ↓
deleteContact(id) called
    ↓
Fetch DELETE /api/contacts/:id
    ↓
Backend receives request
    ↓
Contact.findByIdAndDelete(id)
    ↓
MongoDB removes document
    ↓
Backend sends success response
    ↓
Frontend updates state
    ↓
setContacts(prev => prev.filter(c => c._id !== id))
    ↓
UI removes contact from list
```

## Key Components

### Frontend
- **React App**: Main component managing global state
- **ContactForm**: Form for adding/editing contacts
- **ContactList**: Displays all contacts with search
- **api.js**: HTTP client for backend communication

### Backend
- **Express Server**: RESTful API service
- **Mongoose Models**: Database schema definition
- **Controllers**: Request handlers (inline in this case)
- **Routes**: API endpoints

### Database
- **MongoDB**: NoSQL document database
- **Collections**: contacts collection stores all contact documents
- **Indexes**: MongoDB auto-indexes _id field

## Communication Protocol

- **Type**: HTTP/REST
- **Format**: JSON
- **Methods**: GET, POST, PUT, DELETE
- **Port**: Backend runs on 5000, Frontend on 3000
- **CORS**: Enabled to allow cross-origin requests

## State Management

### Frontend State (App.js)
```javascript
- contacts: Array of contact objects
- editing: Current contact being edited (null if none)
- query: Search query string
- loading: Boolean indicating data fetch in progress
- error: Error message if any
```

### Database State
- All contacts persisted in MongoDB
- No in-memory state loss on server restart
- Automatic timestamps for creation/update

## Error Handling

```
Frontend Error Scenarios:
├─ Network Error (backend down)
│  └─ Display: "Failed to load contacts from server"
├─ Validation Error (missing required fields)
│  └─ Display: Validation messages in form
├─ API Error (e.g., duplicate email)
│  └─ Display: "Failed to save contact"
└─ Delete Confirmation
   └─ User can cancel operation

Backend Error Handling:
├─ Missing Fields: Return 400 Bad Request
├─ MongoDB Error: Return 500 Server Error
├─ Not Found: Return 404 Not Found
└─ All errors logged to console
```

## Security Considerations

Current implementation:
- ✓ CORS configured for localhost
- ✓ Input validation on required fields
- ✓ Mongoose schema validation

For production, add:
- [ ] JWT authentication
- [ ] Request rate limiting
- [ ] Input sanitization
- [ ] HTTPS/TLS
- [ ] Environment variable encryption
- [ ] CORS restricted to specific domains
- [ ] Database authentication

## Performance Optimizations

Current implementation:
- ✓ Indexed queries (MongoDB _id index auto)
- ✓ Sorted by creation date (newest first)

For optimization, consider:
- [ ] Pagination for large datasets
- [ ] Caching (Redis)
- [ ] Database indexes on name/email
- [ ] Frontend memoization (React.memo)
- [ ] Lazy loading of contact details

This architecture ensures:
✅ Clean separation of concerns
✅ Data persistence across sessions
✅ Scalable REST API design
✅ Real-time frontend-backend sync
✅ Automatic database creation
✅ Error handling at all levels
