/**
 * adminAuthMiddleware.js
 * ------------------------------------------------------------------
 * Very small guard for the read endpoints (listing stored messages).
 * The caller must send the header:   x-admin-key: <ADMIN_API_KEY>
 * If ADMIN_API_KEY is not set in .env, the routes stay locked.
 * ------------------------------------------------------------------
 */

const env = require("../config/env");
const ApiError = require("../utils/apiError");

function adminAuth(req, res, next) {
  // No key configured -> deny access instead of exposing the data
  if (!env.ADMIN_API_KEY) {
    return next(
      new ApiError(503, "Admin API is disabled (ADMIN_API_KEY not configured)")
    );
  }

  const providedKey = req.get("x-admin-key");

  if (providedKey !== env.ADMIN_API_KEY) {
    return next(new ApiError(401, "Unauthorized: invalid admin key"));
  }

  return next();
}

module.exports = adminAuth;
