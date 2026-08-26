import { test } from "node:test";
import assert from "node:assert/strict";

import { createRateLimiter } from "../utils/rateLimit.js";

function mockReq(ip = "1.2.3.4") {
  return { ip };
}

function mockRes() {
  return {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    }
  };
}

test("allows requests under the limit", () => {
  const limiter = createRateLimiter({ windowMs: 1000, max: 2 });
  const res = mockRes();
  let nextCalled = 0;

  limiter(mockReq(), res, () => nextCalled++);
  limiter(mockReq(), res, () => nextCalled++);

  assert.equal(nextCalled, 2);
  assert.equal(res.statusCode, null);
});

test("blocks requests over the limit within the window", () => {
  const limiter = createRateLimiter({ windowMs: 1000, max: 1 });
  const res = mockRes();
  let nextCalled = 0;

  limiter(mockReq(), res, () => nextCalled++);
  limiter(mockReq(), res, () => nextCalled++);

  assert.equal(nextCalled, 1);
  assert.equal(res.statusCode, 429);
});

test("tracks separate clients independently", () => {
  const limiter = createRateLimiter({ windowMs: 1000, max: 1 });
  const res = mockRes();
  let nextCalled = 0;

  limiter(mockReq("1.1.1.1"), res, () => nextCalled++);
  limiter(mockReq("2.2.2.2"), res, () => nextCalled++);

  assert.equal(nextCalled, 2);
});
