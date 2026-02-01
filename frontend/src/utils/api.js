const API_BASE = 'http://localhost:5000/api';

export async function fetchContacts() {
  try {
    const response = await fetch(`${API_BASE}/contacts`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error('Failed to fetch contacts:', err);
    return [];
  }
}

export async function createContact(contact) {
  try {
    const response = await fetch(`${API_BASE}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error('Failed to create contact:', err);
    throw err;
  }
}

export async function updateContact(id, contact) {
  try {
    const response = await fetch(`${API_BASE}/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error('Failed to update contact:', err);
    throw err;
  }
}

export async function deleteContact(id) {
  try {
    const response = await fetch(`${API_BASE}/contacts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error('Failed to delete contact:', err);
    throw err;
  }
}

export default { fetchContacts, createContact, updateContact, deleteContact };
