import ContactItem from "./ContactItem";

export default function ContactList({ contacts, onEdit, refresh }) {
  if (!contacts || contacts.length === 0) {
    return <p>No contacts found.</p>;
  }

  return (
    <div>
      <h2>Contacts</h2>

      {contacts.map((contact) => (
        <ContactItem
          key={contact._id}
          contact={contact}
          onEdit={onEdit}
          refresh={refresh}
        />
      ))}
    </div>
  );
}
