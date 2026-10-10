/**
 * apiResponse.js
 * ------------------------------------------------------------------
 * Every endpoint answers with the SAME JSON envelope, so the frontend
 * only ever needs to parse one shape:
 *
 *   { success: boolean, message: string, data: any, errors: object|null }
 * ------------------------------------------------------------------
 */

/**
 * Send a success response. (STEP 3: data back to frontend)
 * @param {import("express").Response} res
 * @param {number} statusCode  200 / 201 ...
 * @param {string} message     Friendly message shown in the UI
 * @param {any}    [data]      Payload
 */
function sendSuccess(res, statusCode, message, data = null) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    errors: null,
  });
}

/**
 * Send an error response.
 * @param {import("express").Response} res
 * @param {number} statusCode
 * @param {string} message
 * @param {object} [errors] field -> message map (validation failures)
 */
function sendError(res, statusCode, message, errors = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
    errors,
  });
}

module.exports = { sendSuccess, sendError };
