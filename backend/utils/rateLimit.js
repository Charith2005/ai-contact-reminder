export function createRateLimiter({ windowMs, max }) {
  const hits = new Map();

  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    const record = hits.get(key);

    if (!record || now - record.start > windowMs) {
      hits.set(key, { start: now, count: 1 });
      return next();
    }

    if (record.count >= max) {
      return res.status(429).json({ error: "Too many requests. Please try again later." });
    }

    record.count += 1;
    next();
  };
}
