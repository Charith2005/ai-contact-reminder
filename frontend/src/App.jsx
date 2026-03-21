import { useEffect, useMemo, useState } from "react";
import ContactList from "./components/ContactList";
import RecommendationPanel from "./components/RecommendationPanel";
import ContactProfile from "./components/ContactProfile";
import ContactForm from "./components/ContactForm";
import MessageGenerator from "./components/MessageGenerator";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [editingContact, setEditingContact] = useState(null);

  async function loadContacts() {
    try {
      const response = await fetch(`${API_BASE}/contacts`);
      const data = await response.json();

      setContacts(data);

      if (data.length && !selectedContact) {
        setSelectedContact(data[0]);
      }
    } catch {
      setError("Failed to load contacts");
    }
  }

  async function loadRecommendations() {
    try {
      const response = await fetch(`${API_BASE}/recommendations`);
      const data = await response.json();
      setRecommendations(data);
    } catch {
      setError("Failed to load recommendations");
    }
  }

  useEffect(() => {
    loadContacts();
    loadRecommendations();
  }, []);

  const recommendationIds = useMemo(() => {
    return new Set(recommendations.map((contact) => contact.id));
  }, [recommendations]);

const filteredContacts = useMemo(() => {
  const term = searchTerm.toLowerCase().trim();

  const filtered = contacts.filter((contact) => {
    const combinedText = [
      contact.name,
      contact.email,
      contact.company,
      contact.notes
    ]
      .join(" ")
      .toLowerCase();

    return combinedText.includes(term);
  });

  return filtered.sort((a, b) => a.name.localeCompare(b.name));
}, [contacts, searchTerm]);

  async function handleSave(contact) {
    setError("");

    const isEditing = Boolean(contact.id);

    const url = isEditing
      ? `${API_BASE}/contacts/${contact.id}`
      : `${API_BASE}/contacts`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to save contact");
        return;
      }

      setEditingContact(null);
      await loadContacts();
      await loadRecommendations();
      setSelectedContact(data);
    } catch {
      setError("Server error while saving contact");
    }
  }

  async function handleDelete(id) {
    setError("");

    try {
      const response = await fetch(`${API_BASE}/contacts/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        setError("Delete failed");
        return;
      }

      const updated = contacts.filter((c) => c.id !== id);
      setContacts(updated);
      setSelectedContact(updated.length > 0 ? updated[0] : null);
      await loadRecommendations();
    } catch {
      setError("Server error while deleting contact");
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <h1>AI Contact Reminder</h1>
          <p>Simple relationship management prototype</p>
        </div>

        <input
          className="search-input"
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      {error && <div className="error-banner">{error}</div>}

      <div className="layout-grid">
        <section className="panel">
          <div className="panel-header">
            <h2>All Contacts</h2>

            <button
              className="primary-btn"
              onClick={() =>
                setEditingContact({
                  name: "",
                  email: "",
                  company: "",
                  lastContactedDate: "",
                  notes: ""
                })
              }
            >
              Add Contact
            </button>
          </div>

          <ContactList
            contacts={filteredContacts}
            selectedContact={selectedContact}
            onSelect={setSelectedContact}
            onEdit={setEditingContact}
            onDelete={handleDelete}
          />
        </section>

        <section className="panel">
          <RecommendationPanel
            recommendations={recommendations}
            onSelect={setSelectedContact}
          />
        </section>

        <section className="panel">
          <ContactProfile contact={selectedContact} />

          {selectedContact && (
            <MessageGenerator
              contact={selectedContact}
              apiBase={API_BASE}
            />
          )}
        </section>
      </div>

      {editingContact && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <ContactForm
              contact={editingContact}
              onSave={handleSave}
              onCancel={() => setEditingContact(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}