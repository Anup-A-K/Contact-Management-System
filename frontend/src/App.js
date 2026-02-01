import React, { useEffect, useState } from 'react';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { fetchContacts, createContact, updateContact, deleteContact } from './utils/api';

function App() {
  const [contacts, setContacts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('all'); // all, name, tags, company
  const [recentlySearched, setRecentlySearched] = useState([]);

  // Load recently searched from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('recentlySearched');
    if (saved) {
      setRecentlySearched(JSON.parse(saved));
    }
    loadContactsFromServer();
  }, []);

  async function loadContactsFromServer() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchContacts();
      // Sort alphabetically by name (case-insensitive)
      const sorted = data.sort((a, b) => 
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
      setContacts(sorted);
    } catch (err) {
      setError('Failed to load contacts from server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(contact) {
    try {
      if (contact._id) {
        // Update existing
        const updated = await updateContact(contact._id, contact);
        const newList = contacts.map((c) =>
          c._id === contact._id ? updated : c
        );
        // Re-sort after update
        newList.sort((a, b) => 
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
        setContacts(newList);
      } else {
        // Create new
        const created = await createContact(contact);
        const newList = [created, ...contacts];
        // Sort after adding
        newList.sort((a, b) => 
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
        setContacts(newList);
      }
      setEditing(null);
    } catch (err) {
      setError('Failed to save contact');
      console.error(err);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this contact?')) return;
    try {
      await deleteContact(id);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      if (editing && editing._id === id) setEditing(null);
    } catch (err) {
      setError('Failed to delete contact');
      console.error(err);
    }
  }

  function handleEdit(contact) {
    setEditing(contact);
    // Add to recently searched
    const updated = [contact, ...recentlySearched.filter(c => c._id !== contact._id)].slice(0, 5);
    setRecentlySearched(updated);
    localStorage.setItem('recentlySearched', JSON.stringify(updated));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancel() {
    setEditing(null);
  }

  function handleRecentlySearchedClick(contact) {
    setEditing(contact);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="app-root">
      <div className="container">
        <h1>Contact Management</h1>

        {error && (
          <div style={{ 
            color: 'red', 
            padding: '10px', 
            marginBottom: '10px', 
            backgroundColor: '#ffe6e6',
            borderRadius: '4px'
          }}>
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            Loading contacts...
          </div>
        ) : (
          <>
            <div className="main-grid">
              <div className="left-pane">
                <div className="pane-card">
                  <ContactForm onSave={handleSave} onCancel={handleCancel} initialData={editing} />
                </div>

                {recentlySearched.length > 0 && (
                  <div className="pane-card recently-searched-card">
                    <h3 className="recently-searched-title">Recently Searched</h3>
                    <div className="recently-searched-list">
                      {recentlySearched.map((contact) => (
                        <div
                          key={contact._id}
                          className="recently-searched-item"
                          onClick={() => handleRecentlySearchedClick(contact)}
                        >
                          <div className="recently-searched-avatar">
                            {contact.name.split(' ')[0].charAt(0).toUpperCase()}
                          </div>
                          <div className="recently-searched-info">
                            <div className="recently-searched-name">{contact.name}</div>
                            <div className="recently-searched-email">{contact.email}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="right-pane">
                <div className="pane-card">
                  <div className="list-header">
                    <input
                      className="search-input"
                      placeholder="Search name, email, company, or tags..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <select 
                      className="filter-select"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="all">All Fields</option>
                      <option value="name">Name</option>
                      <option value="tags">Tags</option>
                      <option value="company">Company</option>
                    </select>
                  </div>

                  <ContactList
                    contacts={contacts}
                    query={query}
                    filterType={filterType}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
