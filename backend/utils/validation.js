import { parseDate } from "./recommendationService.js";

const REQUIRED_FIELDS = ["name", "email", "company", "lastContactedDate", "notes"];
const TRIMMED_FIELDS = ["name", "email", "company", "notes"];

export function validateContact(contact) {
  for (const field of REQUIRED_FIELDS) {
    if (!(field in contact)) {
      return `Missing field: ${field}`;
    }
  }

  if (!contact.name?.trim() || !contact.email?.trim() || !contact.company?.trim()) {
    return "Name, email, and company are required";
  }

  if (!parseDate(contact.lastContactedDate)) {
    return "Invalid date format. Use YYYY-MM-DD";
  }

  return null;
}

export function normalizeContact(contact) {
  const normalized = { ...contact };

  for (const field of TRIMMED_FIELDS) {
    if (typeof normalized[field] === "string") {
      normalized[field] = normalized[field].trim();
    }
  }

  return normalized;
}
