/**
 * rateLimiterMiddleware.js
 * ------------------------------------------------------------------
 * Basic spam / abuse protection for the public contact endpoint:
 * max 5 submissions per IP per 15 minutes.
 * ------------------------------------------------------------------
 */

const rateLimit = require("express-rate-limit");
const { sendError } = require("../utils/apiResponse");

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                   // 5 requests per window per IP
  standardHeaders: true,    // send RateLimit-* headers
  legacyHeaders: false,
  // Custom handler so the response shape matches the rest of the API
  handler: (req, res) =>
    sendError(
      res,
      429,
      "Too many messages sent from this device. Please try again in 15 minutes."
    ),
});

module.exports = { contactLimiter };
