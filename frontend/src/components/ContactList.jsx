export default function ContactList({
  contacts,
  selectedContact,
  onSelect,
  onEdit,
  onDelete
}) {

  if (!contacts.length) {
    return (
      <p className="empty-state">
        No contacts found.
      </p>
    );
  }

  return (

    <div className="list-stack">

      {contacts.map((contact) => (

        <div
          key={contact.id}
          className={
            "contact-card " +
            (selectedContact?.id === contact.id
              ? "active"
              : "")
          }
          onClick={() => onSelect(contact)}
        >

          <div>

            <h3>{contact.name}</h3>

            <p>{contact.company}</p>

            <small>{contact.email}</small>

          </div>

          <div className="action-row">

            <button
              className="primary-btn"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(contact);
              }}
            >
              Edit
            </button>

            <button
              className="danger-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(contact.id);
              }}
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>

  );

}