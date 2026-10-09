/**
 * ApiError.js
 * ------------------------------------------------------------------
 * Custom Error carrying an HTTP status code (and optional field
 * errors). Any layer can `throw new ApiError(400, "...")` and the
 * global error middleware turns it into a clean JSON response.
 * ------------------------------------------------------------------
 */

class ApiError extends Error {
  /**
   * @param {number} statusCode HTTP status (400, 404, 500 ...)
   * @param {string} message    Human readable message for the client
   * @param {object} [errors]   Optional map of field -> message
   */
  constructor(statusCode, message, errors = null) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true; // expected error, not a bug
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message, errors) {
    return new ApiError(400, message, errors);
  }

  static notFound(message = "Resource not found") {
    return new ApiError(404, message);
  }

  static internal(message = "Something went wrong") {
    return new ApiError(500, message);
  }
}

module.exports = ApiError;
