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

export default function ContactList({ contacts, query, onEdit, onDelete }) {
  const visible = useMemo(() => contacts.filter((c) => matchesQuery(c, query)), [contacts, query]);

  if (!contacts || contacts.length === 0) {
    return <div className="empty">No contacts yet. Add a contact to get started.</div>;
  }

  if (visible.length === 0) {
    return <div className="empty">No contacts match your search.</div>;
  }

  return (
    <div className="contact-list">
      {visible.map((c) => (
        <div className="contact-card" key={c.id}>
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

          <div className="contact-actions">
            <button className="btn subtle" onClick={() => onEdit(c)} aria-label={`Edit ${c.name}`}>
              ✏️ Edit
            </button>
            <button className="btn danger" onClick={() => onDelete(c.id)} aria-label={`Delete ${c.name}`}>
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
