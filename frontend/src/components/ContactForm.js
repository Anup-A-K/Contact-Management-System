import React, { useEffect, useState } from 'react';

function validateEmail(email) {
  // Simple RFC-like regex for basic validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactForm({ onSave, onCancel, initialData }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [tags, setTags] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setEmail(initialData.email || '');
      setPhone(initialData.phone || '');
      setCompany(initialData.company || '');
      setTags((initialData.tags || []).join(', '));
      setNotes(initialData.notes || '');
    } else {
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setTags('');
      setNotes('');
    }
    setErrors({});
  }, [initialData]);

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Invalid email';
    if (!phone.trim()) newErrors.phone = 'Phone is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    const contact = {
      id: initialData?.id,
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

    onSave(contact);
    // Reset only when adding (not editing)
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
      <div className="form-row">
        <div className="form-group">
          <label>Name *</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Phone *</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
          {errors.phone && <div className="error">{errors.phone}</div>}
        </div>

        <div className="form-group">
          <label>Company</label>
          <input value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group full">
          <label>Tags (comma separated)</label>
          <input value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group full">
          <label>Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      </div>

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
