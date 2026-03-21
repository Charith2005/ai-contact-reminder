const KEYWORD_PRIORITY = {
  investor: 4,
  mentor: 3,
  advisor: 2,
  friend: 1
};

const PRIORITY_LABELS = {
  investor: "Investor",
  mentor: "Mentor",
  advisor: "Advisor",
  friend: "Friend"
};

export function parseDate(dateString) {
  if (!dateString || typeof dateString !== "string") {
    return null;
  }

  const date = new Date(dateString);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function getDaysSinceLastContact(lastContactedDate) {
  const parsed = parseDate(lastContactedDate);
  if (!parsed) {
    return null;
  }

  const now = new Date();
  const diffMs = now.getTime() - parsed.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export function extractPriorityKeyword(notes = "") {
  const normalized = notes.toLowerCase();
  return Object.keys(KEYWORD_PRIORITY).find((keyword) => normalized.includes(keyword)) || null;
}

export function getPriorityScore(contact) {
  const keyword = extractPriorityKeyword(contact.notes || "");
  return keyword ? KEYWORD_PRIORITY[keyword] : 0;
}

export function getRecommendationReason(contact) {
  const days = getDaysSinceLastContact(contact.lastContactedDate);
  const keyword = extractPriorityKeyword(contact.notes || "");

  if (days === null && keyword) {
    return `${PRIORITY_LABELS[keyword]} contact with missing last contact date`;
  }

  if (days === null) {
    return "Missing or invalid last contacted date";
  }

  if (keyword && days >= 30) {
    return `${PRIORITY_LABELS[keyword]} and not contacted in ${days} days`;
  }

  if (days >= 30) {
    return `Not contacted in ${days} days`;
  }

  return null;
}

export function shouldRecommend(contact) {
  const days = getDaysSinceLastContact(contact.lastContactedDate);
  const hasKeyword = !!extractPriorityKeyword(contact.notes || "");

  return hasKeyword || (days !== null && days >= 30);
}

export function buildRecommendations(contacts = []) {
  return contacts
    .filter(shouldRecommend)
    .map((contact) => ({
      ...contact,
      priorityScore: getPriorityScore(contact),
      daysSinceLastContact: getDaysSinceLastContact(contact.lastContactedDate),
      reason: getRecommendationReason(contact)
    }))
    .sort((a, b) => {
      if (b.priorityScore !== a.priorityScore) {
        return b.priorityScore - a.priorityScore;
      }

      const aDays = a.daysSinceLastContact ?? -1;
      const bDays = b.daysSinceLastContact ?? -1;
      return bDays - aDays;
    });
}