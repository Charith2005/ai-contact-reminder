import express from "express";
import cors from "cors";
import { readContacts, writeContacts } from "./utils/fileStore.js";
import { buildRecommendations, parseDate } from "./utils/recommendationService.js";
import { generatePersonalizedMessage } from "./utils/messageService.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.get("/", (_req, res) => {
  res.send("AI Contact Reminder backend is running.");
});

function validateContact(contact) {
  const requiredFields = ["name", "email", "company", "lastContactedDate", "notes"];

  for (const field of requiredFields) {
    if (!(field in contact)) {
      return `Missing field: ${field}`;
    }
  }

  if (!contact.name || !contact.email || !contact.company) {
    return "Name, email, and company are required";
  }
  if (!parseDate(contact.lastContactedDate)) {
    return "Invalid date format. Use YYYY-MM-DD";
  }

  return null;
}
app.get("/contacts", async (_req, res) => {
  const contacts = await readContacts();
  res.json(contacts);
});

app.post("/contacts", async (req, res) => {
  const error = validateContact(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  const contacts = await readContacts();
  const newContact = {
    id: crypto.randomUUID(),
    ...req.body
  };
  contacts.push(newContact);
  await writeContacts(contacts);
  res.status(201).json(newContact);
});

app.put("/contacts/:id", async (req, res) => {
  const error = validateContact(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Contact not found" });
  }

  contacts[index] = { ...contacts[index], ...req.body };
  await writeContacts(contacts);
  res.json(contacts[index]);
});
app.delete("/contacts/:id", async (req, res) => {
  const contacts = await readContacts();
  const filtered = contacts.filter((contact) => contact.id !== req.params.id);

  if (filtered.length === contacts.length) {
    return res.status(404).json({ error: "Contact not found" });
  }

  await writeContacts(filtered);
  res.json({ success: true });
});
app.get("/recommendations", async (_req, res) => {
  const contacts = await readContacts();

  if (!contacts.length) {
    return res.json([]);
  }

  const recommendations = buildRecommendations(contacts).map((contact) => ({
    id: contact.id,
    name: contact.name,
    email: contact.email,
    company: contact.company,
    notes: contact.notes,
    lastContactedDate: contact.lastContactedDate,
    reason: contact.reason,
    daysSinceLastContact: contact.daysSinceLastContact
  }));

  res.json(recommendations);
});
app.post("/generate-message", async (req, res) => {
  const { contactName, relationshipContext, lastConversation } = req.body;

  if (!contactName || !relationshipContext || !lastConversation) {
    return res.status(400).json({
      error: "contactName, relationshipContext, and lastConversation are required"
    });
  }

  const contacts = await readContacts();
  const matchedContact = contacts.find((contact) => contact.name === contactName);

  const message = generatePersonalizedMessage({
    contactName,
    relationshipContext,
    lastConversation,
    company: matchedContact?.company
  });

  res.json({ message });
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

 
  