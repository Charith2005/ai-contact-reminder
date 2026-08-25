import { useState } from "react";

export default function ContactForm({ contact, onSave, onCancel }) {
  const [formData, setFormData] = useState(contact);

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="form-stack">
      <h2>{contact.id ? "Edit Contact" : "Add Contact"}</h2>

      <input
        type="text"
        placeholder="Name"
        aria-label="Name"
        value={formData.name}
        onChange={(e) => updateField("name", e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        aria-label="Email"
        value={formData.email}
        onChange={(e) => updateField("email", e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Company"
        aria-label="Company"
        value={formData.company}
        onChange={(e) => updateField("company", e.target.value)}
        required
      />

      <input
        type="date"
        aria-label="Last contacted date"
        value={formData.lastContactedDate}
        onChange={(e) => updateField("lastContactedDate", e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Notes"
        aria-label="Notes"
        value={formData.notes}
        onChange={(e) => updateField("notes", e.target.value)}
      />

      <div className="action-row">
        <button className="primary-btn" type="submit">
          Save
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
