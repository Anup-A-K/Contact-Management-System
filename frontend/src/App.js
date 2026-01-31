import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import SearchBar from "./components/SearchBar";
import API from "./services/api";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchContacts = async (query = "") => {
    try {
      const res = await API.get(`/contacts?search=${query}`);
      setContacts(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch contacts");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="container">
      <h1>Contact Management System</h1>

      <SearchBar onSearch={fetchContacts} />

      <ContactForm
        editing={editing}
        setEditing={setEditing}
        refresh={fetchContacts}
      />

      <ContactList
        contacts={contacts}
        onEdit={setEditing}
        refresh={fetchContacts}
      />
    </div>
  );
}

export default App;
