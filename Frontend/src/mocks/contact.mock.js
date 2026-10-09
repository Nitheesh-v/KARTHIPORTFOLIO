/**
 * contact.mock.js
 * ------------------------------------------------------------------
 * Offline/demo mode for the contact form.
 *
 * Enable it with  VITE_USE_MOCK_API=true  in Frontend/.env
 * Useful when: the backend is not running, you are demoing the UI,
 * or you want to see the error / validation states on purpose.
 *
 * It returns the EXACT same envelope as the real API
 * ({ success, message, data, errors }) so no component changes.
 * ------------------------------------------------------------------
 */

/** Is mock mode switched on? */
export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === "true";

/** Fake network latency so loading states are visible. */
const delay = (ms = 700) => new Promise((resolve) => setTimeout(resolve, ms));

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Mock of POST /api/contact - mirrors the backend validator rules.
 * Tip: send the message "fail" to simulate a server error.
 * @param {{name:string,email:string,message:string}} formData
 */
export async function mockSubmitContactForm(formData) {
  await delay();

  // --- same validation as Backend/src/validators/contact.validator.js
  const errors = {};
  const name = (formData.name || "").trim();
  const email = (formData.email || "").trim().toLowerCase();
  const message = (formData.message || "").trim();

  if (name.length < 2) errors.name = "Name must be between 2 and 80 characters";
  if (!EMAIL_REGEX.test(email)) errors.email = "Please enter a valid email address";
  if (message.length < 5) errors.message = "Message must be between 5 and 2000 characters";

  if (Object.keys(errors).length) {
    return {
      success: false,
      message: "Please correct the highlighted fields",
      data: null,
      errors,
      status: 422,
    };
  }

  // Escape hatch to preview the error alert
  if (message.toLowerCase() === "fail") {
    return {
      success: false,
      message: "Unable to reach the server. Please check your connection.",
      data: null,
      errors: null,
      status: 0,
    };
  }

  return {
    success: true,
    message: "Thank you! Your message has been sent successfully. (mock)",
    data: {
      id: `mock_${Date.now()}`,
      name,
      email,
      createdAt: new Date().toISOString(),
      emailSent: true,
    },
    errors: null,
    status: 201,
  };
}

/** Mock of GET /api/health */
export async function mockCheckApiHealth() {
  await delay(200);
  return {
    success: true,
    message: "API is healthy (mock)",
    data: { uptimeSeconds: 42, database: "connected", timestamp: new Date().toISOString() },
    errors: null,
    status: 200,
  };
}
