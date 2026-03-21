function firstNameOf(fullName = "") {
  return fullName.trim().split(" ")[0] || "there";
}

function pickRelationshipLabel(relationshipContext = "") {
  const value = relationshipContext.trim().toLowerCase();

  if (!value) return "contact";
  if (value.includes("mentor")) return "mentor";
  if (value.includes("investor")) return "investor";
  if (value.includes("advisor")) return "advisor";
  if (value.includes("friend")) return "friend";

  return relationshipContext.trim() || "contact";
}

function cleanConversationText(lastConversation = "") {
  const text = lastConversation.trim();

  if (!text) {
    return "our last conversation";
  }

  const lowered = text.toLowerCase();

  if (lowered.startsWith("we discussed ")) {
    return `our conversation about ${text.slice(13)}`;
  }

  if (lowered.startsWith("we talked about ")) {
    return `our conversation about ${text.slice(16)}`;
  }

  return text;
}

function companyText(company = "") {
  if (!company || !company.trim()) {
    return "I hope you have been doing well.";
  }

  return `I hope things are going well at ${company.trim()}.`;
}

function appreciationText(relationship = "contact") {
  if (relationship === "mentor") {
    return "I have always appreciated your guidance and perspective.";
  }

  if (relationship === "investor") {
    return "I have always appreciated your perspective and encouragement.";
  }

  if (relationship === "advisor") {
    return "I have always appreciated your advice and thoughtful input.";
  }

  if (relationship === "friend") {
    return "I have always enjoyed our conversations and staying in touch.";
  }

  return "I have always appreciated staying in touch.";
}

function closingText(relationship = "contact") {
  if (relationship === "mentor") {
    return "I would love to catch up and hear any thoughts you might have.";
  }

  if (relationship === "investor") {
    return "I would love to reconnect and hear what you have been thinking lately.";
  }

  if (relationship === "advisor") {
    return "I would love to reconnect and get your thoughts when you have time.";
  }

  if (relationship === "friend") {
    return "I would love to catch up and hear how things have been going.";
  }

  return "I would love to reconnect when you have time.";
}

export function generatePersonalizedMessage({
  contactName,
  relationshipContext,
  lastConversation,
  company
}) {
  const firstName = firstNameOf(contactName);
  const relationship = pickRelationshipLabel(relationshipContext);
  const conversation = cleanConversationText(lastConversation);
  const intro = companyText(company);
  const appreciation = appreciationText(relationship);
  const closing = closingText(relationship);

  const templates = [
    `Hey ${firstName} — ${intro} It has been a little while since we last spoke, and I was thinking about ${conversation}. ${appreciation} ${closing}`,

    `Hi ${firstName} — ${intro} I was recently thinking about ${conversation} and wanted to reach out. ${appreciation} ${closing}`,

    `Hey ${firstName} — I hope all is well. ${company && company.trim() ? `I hope things are going smoothly at ${company.trim()}. ` : ""}It has been a while, and I was thinking back to ${conversation}. ${appreciation} ${closing}`,

    `Hi ${firstName} — ${intro} It has been some time since we last connected, and ${conversation} came to mind. ${appreciation} ${closing}`
  ];

  const randomIndex = Math.floor(Math.random() * templates.length);
  return templates[randomIndex];
}