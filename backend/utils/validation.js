import { parseDate } from "./recommendationService.js";

const REQUIRED_FIELDS = ["name", "email", "company", "lastContactedDate", "notes"];
const TRIMMED_FIELDS = ["name", "email", "company", "notes"];

const MAX_LENGTHS = {
  name: 100,
  email: 254,
  company: 150,
  notes: 2000
};

export function validateContact(contact) {
  for (const field of REQUIRED_FIELDS) {
    if (!(field in contact)) {
      return `Missing field: ${field}`;
    }
  }

  if (!contact.name?.trim() || !contact.email?.trim() || !contact.company?.trim()) {
    return "Name, email, and company are required";
  }

  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    if (typeof contact[field] === "string" && contact[field].length > max) {
      return `${field} must be ${max} characters or fewer`;
    }
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
