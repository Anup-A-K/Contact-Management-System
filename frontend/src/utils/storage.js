const KEY = 'cms_contacts_v1';

export function loadContacts() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load contacts', e);
    return [];
  }
}

export function saveContacts(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list || []));
  } catch (e) {
    console.error('Failed to save contacts', e);
  }
}

export default { loadContacts, saveContacts };
