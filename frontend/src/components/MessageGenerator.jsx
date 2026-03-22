import { useState } from "react";

export default function MessageGenerator({ contact, apiBase }) {
  const [relationshipContext, setRelationshipContext] = useState(
    contact.notes || "professional contact"
  );
  const [lastConversation, setLastConversation] = useState(
    "I wanted to reconnect and see how things are going"
  );
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function generateMessage() {
    setMessage("");
    setError("");

    try {
      const response = await fetch(`${apiBase}/generate-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contactName: contact.name,
          relationshipContext,
          lastConversation,
          company: contact.company
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Message failed");
        return;
      }

      setMessage(data.message);
    } catch {
      setError("Server error");
    }
  }

  return (
    <div className="message-box">
      <h2>Generate Message</h2>

      <input
        value={relationshipContext}
        onChange={(e) => setRelationshipContext(e.target.value)}
        placeholder="Relationship"
      />

      <textarea
        rows="4"
        value={lastConversation}
        onChange={(e) => setLastConversation(e.target.value)}
        placeholder="Last conversation"
      />

      <button className="primary-btn" onClick={generateMessage}>
        Generate
      </button>

      {error && <p className="error-text">{error}</p>}
      {message && <div className="generated-message">{message}</div>}
    </div>
  );
}