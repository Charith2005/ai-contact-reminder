import { test } from "node:test";
import assert from "node:assert/strict";

import { buildRecommendations, getDaysSinceLastContact } from "../utils/recommendationService.js";

function daysAgo(n) {
  const date = new Date();
  date.setDate(date.getDate() - n);
  return date.toISOString().slice(0, 10);
}

test("getDaysSinceLastContact returns null for an invalid date", () => {
  assert.equal(getDaysSinceLastContact("not-a-date"), null);
});

test("buildRecommendations flags contacts untouched for 30+ days", () => {
  const contacts = [
    { id: "1", name: "Stale", lastContactedDate: daysAgo(40), notes: "" },
    { id: "2", name: "Fresh", lastContactedDate: daysAgo(2), notes: "" }
  ];

  const recommended = buildRecommendations(contacts).map((c) => c.id);
  assert.deepEqual(recommended, ["1"]);
});

test("buildRecommendations ranks investor above mentor above a plain overdue contact", () => {
  const contacts = [
    { id: "friend", name: "Friend", lastContactedDate: daysAgo(40), notes: "friend" },
    { id: "investor", name: "Investor", lastContactedDate: daysAgo(5), notes: "investor" },
    { id: "mentor", name: "Mentor", lastContactedDate: daysAgo(5), notes: "mentor" }
  ];

  const order = buildRecommendations(contacts).map((c) => c.id);
  assert.deepEqual(order, ["investor", "mentor", "friend"]);
});

test("buildRecommendations excludes contacts under 30 days with no priority keyword", () => {
  const contacts = [{ id: "1", name: "Recent", lastContactedDate: daysAgo(3), notes: "" }];
  assert.deepEqual(buildRecommendations(contacts), []);
});
