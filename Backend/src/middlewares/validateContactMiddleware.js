/**
 * validateContactMiddleware.js
 * ------------------------------------------------------------------
 * Runs the contact validator on req.body.
 *  - invalid -> 422 response with a field -> message map
 *  - valid   -> stores the CLEANED data on req.validated and continues
 * The controller therefore always works with trusted data.
 * ------------------------------------------------------------------
 */

const { validateContactPayload } = require("../validators/contactValidator");
const { sendError } = require("../utils/apiResponse");

function validateContact(req, res, next) {
  const { valid, errors, data } = validateContactPayload(req.body);

  if (!valid) {
    // 422 = Unprocessable Entity (payload understood but invalid)
    return sendError(res, 422, "Please correct the highlighted fields", errors);
  }

  req.validated = data; // sanitised payload for the next layers
  return next();
}

module.exports = validateContact;
