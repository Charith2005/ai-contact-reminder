import { test } from "node:test";
import assert from "node:assert/strict";

import { validateContact, normalizeContact, isDuplicateEmail } from "../utils/validation.js";

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

test("validateContact rejects a name over the length limit", () => {
  assert.match(
    validateContact({ ...validContact, name: "a".repeat(101) }),
    /name must be 100 characters or fewer/
  );
});

test("validateContact rejects notes over the length limit", () => {
  assert.match(
    validateContact({ ...validContact, notes: "a".repeat(2001) }),
    /notes must be 2000 characters or fewer/
  );
});

test("isDuplicateEmail matches case-insensitively", () => {
  const contacts = [{ id: "1", email: "Ada@Example.com" }];
  assert.equal(isDuplicateEmail(contacts, "ada@example.com"), true);
});

test("isDuplicateEmail excludes the given id", () => {
  const contacts = [{ id: "1", email: "ada@example.com" }];
  assert.equal(isDuplicateEmail(contacts, "ada@example.com", "1"), false);
});

test("isDuplicateEmail returns false when no match", () => {
  const contacts = [{ id: "1", email: "ada@example.com" }];
  assert.equal(isDuplicateEmail(contacts, "grace@example.com"), false);
});
