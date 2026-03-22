export default function ContactProfile({
  contact,
  onEdit,
  onDelete
}) {

  if (!contact) {

    return (

      <p className="empty-state">
        Select a contact to view details.
      </p>

    );

  }

  return (

    <div className="profile-card">

      <h2>
        {contact.name}
      </h2>

      <p>
        <strong>Email:</strong> {contact.email}
      </p>

      <p>
        <strong>Company:</strong> {contact.company}
      </p>

      <p>
        <strong>Last Contacted:</strong> {contact.lastContactedDate}
      </p>

      <p>
        <strong>Notes:</strong> {contact.notes || "None"}
      </p>


      <div className="action-row">

        <button
          className="primary-btn"
          onClick={() => onEdit(contact)}
        >
          Edit
        </button>


        <button
          className="danger-btn"
          onClick={() => onDelete(contact.id)}
        >
          Delete
        </button>

      </div>

    </div>

  );

}