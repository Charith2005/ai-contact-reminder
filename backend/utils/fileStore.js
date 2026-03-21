import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONTACTS_FILE = path.join(__dirname, "..", "contacts.json");

export async function readContacts() {
  try {
    const raw = await fs.readFile(CONTACTS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function writeContacts(contacts) {
  await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
}