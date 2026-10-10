/**
 * contact.validator.js
 * ------------------------------------------------------------------
 * STEP 1 (data from frontend) - sanitise + validate the request body
 * BEFORE it reaches the controller / database.
 * Pure functions, zero dependencies, easy to unit test.
 * ------------------------------------------------------------------
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trim a value and guarantee a string back. */
const clean = (value) => (typeof value === "string" ? value.trim() : "");

/**
 * Validate the POST /api/contact payload.
 * @param {object} body raw req.body coming from the React form
 * @returns {{ valid: boolean, errors: object, data: {name, email, message} }}
 */
function validateContactPayload(body = {}) {
  const data = {
    name: clean(body.name),
    email: clean(body.email).toLowerCase(),
    message: clean(body.message),
  };

  const errors = {};

  // --- name ---
  if (!data.name) {
    errors.name = "Name is required";
  } else if (data.name.length < 2 || data.name.length > 80) {
    errors.name = "Name must be between 2 and 80 characters";
  }

  // --- email ---
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  // --- message ---
  if (!data.message) {
    errors.message = "Message is required";
  } else if (data.message.length < 5 || data.message.length > 2000) {
    errors.message = "Message must be between 5 and 2000 characters";
  }

  return { valid: Object.keys(errors).length === 0, errors, data };
}

module.exports = { validateContactPayload };
