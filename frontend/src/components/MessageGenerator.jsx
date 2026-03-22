import { useEffect, useMemo, useState } from "react";

export default function MessageGenerator({ contact, apiBase }) {
  const [relationshipContext, setRelationshipContext] = useState(
    contact?.notes || "professional contact"
  );
  const [selectedTopic, setSelectedTopic] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const topicOptions = useMemo(() => {
    const relationship = (contact?.notes || "").toLowerCase();

    if (relationship.includes("mentor")) {
      return [
        "Career advice",
        "Project guidance",
        "Industry insights",
        "General check-in",
        "Catch up conversation"
      ];
    }

    if (relationship.includes("investor")) {
      return [
        "Startup progress update",
        "Fundraising conversation",
        "Product update",
        "Market feedback",
        "General check-in"
      ];
    }

    if (relationship.includes("advisor")) {
      return [
        "Strategic advice",
        "Project update",
        "Feedback request",
        "General check-in"
      ];
    }

    if (relationship.includes("friend")) {
      return [
        "Catch up conversation",
        "Life update",
        "General check-in",
        "Reconnect socially"
      ];
    }

    return [
      "General check-in",
      "Career update",
      "Catch up conversation"
    ];
  }, [contact]);

  useEffect(() => {
    setRelationshipContext(contact?.notes || "professional contact");
    setSelectedTopic(topicOptions[0] || "");
    setMessage("");
    setError("");
  }, [contact, topicOptions]);

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
          lastConversation: selectedTopic,
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

      <p className="helper-text">
        Choose a relationship type and a suggested outreach topic.
      </p>

      <select
        value={relationshipContext}
        onChange={(e) => setRelationshipContext(e.target.value)}
      >
        <option value="mentor">Mentor</option>
        <option value="investor">Investor</option>
        <option value="advisor">Advisor</option>
        <option value="friend">Friend</option>
        <option value="professional contact">Professional Contact</option>
      </select>

      <select
        value={selectedTopic}
        onChange={(e) => setSelectedTopic(e.target.value)}
      >
        {topicOptions.map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>

      <button className="primary-btn" onClick={generateMessage}>
        Generate
      </button>

      {error && <p className="error-text">{error}</p>}
      {message && <div className="generated-message">{message}</div>}
    </div>
  );
}