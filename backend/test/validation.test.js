import { test } from "node:test";
import assert from "node:assert/strict";

import { validateContact, normalizeContact } from "../utils/validation.js";

const validContact = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines Inc",
  lastContactedDate: "2024-01-01",
  notes: "mentor"
};

test("validateContact accepts a well-formed contact", () => {
  assert.equal(validateContact(validContact), null);
});

test("validateContact rejects a missing field", () => {
  const { notes, ...rest } = validContact;
  assert.match(validateContact(rest), /Missing field: notes/);
});

test("validateContact rejects a whitespace-only name", () => {
  assert.match(
    validateContact({ ...validContact, name: "   " }),
    /Name, email, and company are required/
  );
});

test("validateContact rejects an invalid date", () => {
  assert.match(
    validateContact({ ...validContact, lastContactedDate: "not-a-date" }),
    /Invalid date format/
  );
});

test("normalizeContact trims string fields", () => {
  const normalized = normalizeContact({
    ...validContact,
    name: "  Ada Lovelace  ",
    notes: "  mentor  "
  });

  assert.equal(normalized.name, "Ada Lovelace");
  assert.equal(normalized.notes, "mentor");
});
