/**
 * asyncHandler.js
 * ------------------------------------------------------------------
 * Express 4 does not catch rejected promises from async controllers.
 * Wrapping a controller with asyncHandler() forwards any thrown /
 * rejected error to the global error middleware via next(err),
 * so we never need try/catch inside controllers.
 * ------------------------------------------------------------------
 */

/**
 * @param {Function} fn async (req, res, next) => {...}
 * @returns {Function} safe express handler
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
