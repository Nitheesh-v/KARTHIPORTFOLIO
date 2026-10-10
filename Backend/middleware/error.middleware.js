/**
 * error.middleware.js
 * ------------------------------------------------------------------
 * THE single place where errors become HTTP responses.
 * Must be registered LAST in app.js (Express identifies it by its
 * 4 arguments).
 * ------------------------------------------------------------------
 */

const env = require("../config/env");
const logger = require("../utils/logger");
const { sendError } = require("../utils/apiResponse");

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";
  let errors = err.errors || null;

  // --- Mongoose: schema validation failed ---
  if (err.name === "ValidationError") {
    statusCode = 422;
    message = "Validation failed";
    errors = Object.fromEntries(
      Object.entries(err.errors).map(([field, e]) => [field, e.message])
    );
  }

  // --- Mongoose: bad ObjectId in the URL ---
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value for "${err.path}"`;
  }

  // --- Mongo: duplicate key ---
  if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate entry";
  }

  // Always log the full error on the server side
  logger.error(`${req.method} ${req.originalUrl} -> ${statusCode}`, err.message);

  // Leak the stack trace only in development
  if (env.NODE_ENV === "development" && statusCode >= 500) {
    console.error(err.stack);
  }

  return sendError(res, statusCode, message, errors);
}

module.exports = errorHandler;
