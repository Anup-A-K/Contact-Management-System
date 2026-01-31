import { useEffect, useState } from "react";
import API from "../services/api";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  tags: "",
  notes: ""
};

export default function ContactForm({ editing, setEditing, refresh }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name || "",
        email: editing.email || "",
        phone: editing.phone || "",
        company: editing.company || "",
        tags: editing.tags || "",
        notes: editing.notes || ""
      });
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      alert("Name, Email and Phone are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Invalid email format");
      return;
    }

    try {
      if (editing) {
        await API.put(`/contacts/${editing._id}`, form);
      } else {
        await API.post("/contacts", form);
      }

      setForm(emptyForm);
      setEditing(null);
      refresh();
    } catch (err) {
      alert("Something went wrong");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editing ? "Edit Contact" : "Add Contact"}</h2>

      <input
        type="text"
        name="name"
        placeholder="Name *"
        value={form.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email *"
        value={form.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone *"
        value={form.phone}
        onChange={handleChange}
      />

      <input
        type="text"
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
      />

      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleChange}
      />

      <textarea
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
      />

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button type="submit" style={{ flex: "1", minWidth: "120px" }}>
            {editing ? "Update Contact" : "Add Contact"}
          </button>
          {editing && (
            <button 
              type="button" 
              onClick={() => {
                setForm(emptyForm);
                setEditing(null);
              }}
              style={{ flex: "1", minWidth: "120px", backgroundColor: "#6c757d", color: "white" }}
            >
              Cancel
            </button>
          )}
        </div>
    </form>
  );
}
