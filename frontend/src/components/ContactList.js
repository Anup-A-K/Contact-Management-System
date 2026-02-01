import React, { useMemo } from 'react';

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360; // hue
  return `hsl(${h} 60% 70%)`;
}

function matchesQuery(contact, q) {
  if (!q) return true;
  const s = q.trim().toLowerCase();
  if (!s) return true;
  if (contact.name.toLowerCase().includes(s)) return true;
  if (contact.email.toLowerCase().includes(s)) return true;
  if ((contact.company || '').toLowerCase().includes(s)) return true;
  if ((contact.tags || []).some((t) => t.toLowerCase().includes(s))) return true;
  return false;
}
function matchesFilter(contact, q, filterType) {
  if (!q) return true;
  const s = q.trim().toLowerCase();
  if (!s) return true;

  if (filterType === 'all') {
    return matchesQuery(contact, q);
  } else if (filterType === 'name') {
    return contact.name.toLowerCase().includes(s);
  } else if (filterType === 'tags') {
    return (contact.tags || []).some((t) => t.toLowerCase().includes(s));
  } else if (filterType === 'company') {
    return (contact.company || '').toLowerCase().includes(s);
  }
  return true;
}

export default function ContactList({ contacts, query, filterType, onEdit, onDelete }) {
  const visible = useMemo(() => contacts.filter((c) => matchesFilter(c, query, filterType)), [contacts, query, filterType]);

  if (!contacts || contacts.length === 0) {
    return <div className="empty">No contacts yet. Add a contact to get started.</div>;
  }

  if (visible.length === 0) {
    return <div className="empty">No contacts match your search.</div>;
  }

  return (
    <div className="contact-list">
      {visible.map((c) => (
        <div className="contact-card" key={c._id}>
          <div className="contact-info-wrapper">
            <div className="contact-avatar" style={{ background: stringToColor(c.name) }}>
              {getInitials(c.name)}
            </div>

            <div className="contact-main">
              <div className="contact-name">{c.name}</div>
              <div className="contact-meta">
                <span className="muted">{c.email}</span>
                <span className="dot">•</span>
                <span className="muted">{c.phone}</span>
                {c.company ? (
                  <>
                    <span className="dot">•</span>
                    <span className="muted">{c.company}</span>
                  </>
                ) : null}
              </div>
              {c.tags && c.tags.length ? (
                <div className="tags">
                  {c.tags.map((t, i) => (
                    <span className="tag" key={i}>
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
              {c.notes ? <div className="notes">{c.notes}</div> : null}
            </div>
          </div>

          <div className="contact-actions">
            <button className="btn subtle" onClick={() => onEdit(c)} aria-label={`Edit ${c.name}`}>
              ✏️ Edit
            </button>
            <button className="btn danger" onClick={() => onDelete(c._id)} aria-label={`Delete ${c.name}`}>
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
