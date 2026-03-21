export default function ContactProfile({
  contact
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
        <strong>Email:</strong>
        {" "}
        {contact.email}
      </p>

      <p>
        <strong>Company:</strong>
        {" "}
        {contact.company}
      </p>

      <p>
        <strong>Last Contacted:</strong>
        {" "}
        {contact.lastContactedDate}
      </p>

      <p>
        <strong>Notes:</strong>
        {" "}
        {contact.notes || "None"}
      </p>

    </div>

  );

}