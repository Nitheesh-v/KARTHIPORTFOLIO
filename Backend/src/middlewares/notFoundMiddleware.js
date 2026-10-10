/**
 * notFoundMiddleware.js
 * ------------------------------------------------------------------
 * Catches any request that matched no route and converts it into a
 * 404 ApiError handed to the global error handler.
 * ------------------------------------------------------------------
 */

const ApiError = require("../utils/apiError");

function notFound(req, res, next) {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
}

module.exports = notFound;
