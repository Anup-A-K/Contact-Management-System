const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/contact-management';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✓ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('✗ MongoDB connection error:', err);
    process.exit(1);
  });

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: '',
  },
  company: {
    type: String,
    default: '',
  },
  tags: {
    type: [String],
    default: [],
  },
  notes: {
    type: String,
    default: '',
  },
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes

// GET all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single contact
app.get('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create contact
app.post('/api/contacts', async (req, res) => {
  try {
    const { name, email, phone, company, tags, notes } = req.body;
    
    console.log('POST /api/contacts received:', { name, email, phone, company, tags, notes });

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const contact = new Contact({
      name,
      email,
      phone,
      company,
      tags,
      notes,
    });

    const saved = await contact.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update contact
app.put('/api/contacts/:id', async (req, res) => {
  try {
    const { name, email, phone, company, tags, notes } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        phone,
        company,
        tags,
        notes,
      },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE contact
app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Backend server running on http://localhost:${PORT}`);
  console.log(`✓ MongoDB URI: ${MONGO_URI}`);
});
