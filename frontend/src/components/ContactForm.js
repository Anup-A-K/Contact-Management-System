import React, { useEffect, useState } from 'react';

// Validation Functions
function validateEmail(email) {
  // email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validatePhone(phone) {
  // phone is exactly 10 digits (numbers only)
  const phonePattern = /^\d{10}$/;
  return phonePattern.test(phone);
}

// Main Form Component
export default function ContactForm({ onSave, onCancel, initialData }) {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [tags, setTags] = useState('');
  const [notes, setNotes] = useState('');
  
  // State for validation errors
  const [errors, setErrors] = useState({});

  // Initialize form with data
  useEffect(() => {
    if (initialData) {
      // Fill form with existing contact data
      setName(initialData.name || '');
      setEmail(initialData.email || '');
      setPhone(initialData.phone || '');
      setCompany(initialData.company || '');
      setTags((initialData.tags || []).join(', '));
      setNotes(initialData.notes || '');
    } else {
      // Clear all fields for new contact
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setTags('');
      setNotes('');
    }
    // Clear any previous errors
    setErrors({});
  }, [initialData]);

  // Check email validity while user types
  useEffect(() => {
    if (email.trim() === '') {
      // Empty email - clear error
      setErrors((prev) => ({ ...prev, email: null }));
    } else if (!validateEmail(email)) {
      // Invalid email format - show error
      setErrors((prev) => ({ ...prev, email: 'Invalid email format' }));
    } else {
      // Valid email - clear error
      setErrors((prev) => ({ ...prev, email: null }));
    }
  }, [email]);

  // Check phone validity while user types
  useEffect(() => {
    if (phone.trim() === '') {
      // Empty phone - clear error
      setErrors((prev) => ({ ...prev, phone: null }));
    } else if (!validatePhone(phone)) {
      // Invalid phone (not exactly 10 digits) - show error
      setErrors((prev) => ({ ...prev, phone: 'Phone must be exactly 10 digits' }));
    } else {
      // Valid phone - clear error
      setErrors((prev) => ({ ...prev, phone: null }));
    }
  }, [phone]);

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    
    // Validate all required fields
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Phone must be exactly 10 digits';
    }

    // Update errors state
    setErrors(newErrors);
    
    // Stop if there are any errors
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Prepare contact data for saving
    const contact = {
      _id: initialData?._id,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      notes: notes.trim(),
    };

    // Save contact
    onSave(contact);
    
    // Clear form only when adding new contact (not when editing)
    if (!initialData) {
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setTags('');
      setNotes('');
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {/* Name and Email Row */}
      <div className="form-row">
        <div className="form-group">
          <label>Name *</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className={email && validateEmail(email) ? 'input-valid' : email ? 'input-invalid' : ''}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
      </div>

      {/* Phone and Company Row */}
      <div className="form-row">
        <div className="form-group">
          <label>Phone *</label>
          <input 
            value={phone} 
            onChange={(e) => {
              // Remove any non-digit characters
              let digitsOnly = e.target.value.replace(/\D/g, '');
              // Keep only first 10 digits
              digitsOnly = digitsOnly.slice(0, 10);
              setPhone(digitsOnly);
            }}
            maxLength="10"
            placeholder="10-digit number"
            className={phone && validatePhone(phone) ? 'input-valid' : phone ? 'input-invalid' : ''}
          />
          {errors.phone && <div className="error">{errors.phone}</div>}
        </div>

        <div className="form-group">
          <label>Company</label>
          <input value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
      </div>

      {/* Tags Row */}
      <div className="form-row">
        <div className="form-group full">
          <label>Tags (comma separated)</label>
          <input value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
      </div>

      {/* Notes Row */}
      <div className="form-row">
        <div className="form-group full">
          <label>Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="form-actions">
        <button type="submit" className="btn primary">
          {initialData ? 'Update Contact' : 'Add Contact'}
        </button>
        {initialData && (
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
