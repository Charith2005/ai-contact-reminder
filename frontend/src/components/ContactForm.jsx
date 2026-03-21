import { useState } from "react";

export default function ContactForm({
  contact,
  onSave,
  onCancel
}) {

  const [formData, setFormData] =
    useState(contact);

  function updateField(
    field,
    value
  ) {

    setFormData((prev) => ({

      ...prev,
      [field]: value

    }));

  }

  function handleSubmit(e) {

    e.preventDefault();

    onSave(formData);

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="form-stack"
    >

      <h2>

        {contact.id
          ? "Edit Contact"
          : "Add Contact"}

      </h2>

      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) =>
          updateField(
            "name",
            e.target.value
          )
        }
      />

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) =>
          updateField(
            "email",
            e.target.value
          )
        }
      />

      <input
        type="text"
        placeholder="Company"
        value={formData.company}
        onChange={(e) =>
          updateField(
            "company",
            e.target.value
          )
        }
      />

      <input
        type="date"
        value={
          formData.lastContactedDate
        }
        onChange={(e) =>
          updateField(
            "lastContactedDate",
            e.target.value
          )
        }
      />

      <input
        type="text"
        placeholder="Notes"
        value={formData.notes}
        onChange={(e) =>
          updateField(
            "notes",
            e.target.value
          )
        }
      />

      <div className="action-row">

        <button
          className="primary-btn"
          type="submit"
        >
          Save
        </button>

        <button
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>

      </div>

    </form>

  );

}