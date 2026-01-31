import API from "../services/api";

export default function ContactItem({ contact, onEdit, refresh }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Delete contact "${contact.name}"?`
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/contacts/${contact._id}`);
      refresh();
    } catch (err) {
      alert("Failed to delete contact");
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h3>{contact.name}</h3>

      <p><strong>Email:</strong> {contact.email}</p>
      <p><strong>Phone:</strong> {contact.phone}</p>

      {contact.company && (
        <p><strong>Company:</strong> {contact.company}</p>
      )}

      {contact.tags && (
        <p><strong>Tags:</strong> {contact.tags}</p>
      )}

      {contact.notes && (
        <p><strong>Notes:</strong> {contact.notes}</p>
      )}

      <button onClick={() => onEdit(contact)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
