import React, { useEffect, useState } from 'react';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { loadContacts, saveContacts } from './utils/storage';

function App() {
  const [contacts, setContacts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const stored = loadContacts();
    if (stored && stored.length) {
      setContacts(stored);
    } else {
      setContacts([]);
    }
  }, []);

  useEffect(() => {
    saveContacts(contacts);
  }, [contacts]);

  function handleSave(contact) {
    if (contact.id) {
      setContacts((prev) => prev.map((c) => (c.id === contact.id ? contact : c)));
    } else {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      setContacts((prev) => [{ ...contact, id }, ...prev]);
    }
    setEditing(null);
  }

  function handleDelete(id) {
    if (!window.confirm('Delete this contact?')) return;
    setContacts((prev) => prev.filter((c) => c.id !== id));
    if (editing && editing.id === id) setEditing(null);
  }

  function handleEdit(contact) {
    setEditing(contact);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancel() {
    setEditing(null);
  }

  return (
    <div className="app-root">
      <div className="container">
        <h1>Contact Management</h1>

        <ContactForm onSave={handleSave} onCancel={handleCancel} initialData={editing} />

        <div className="list-header">
          <input
            className="search-input"
            placeholder="Search name, email, company, or tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <ContactList
          contacts={contacts}
          query={query}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
