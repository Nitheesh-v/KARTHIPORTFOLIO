/**
 * contactRoutes.js
 * ------------------------------------------------------------------
 * URL -> middleware chain -> controller mapping for /api/contact
 * ------------------------------------------------------------------
 */

const express = require("express");

const controller = require("../controllers/contactController");
const validateContact = require("../middlewares/validateContactMiddleware");
const adminAuth = require("../middlewares/adminAuthMiddleware");
const { contactLimiter } = require("../middlewares/rateLimiterMiddleware");

const router = express.Router();

/**
 * POST /api/contact
 * Public endpoint used by the React contact form.
 * Chain: rate limit -> validation -> controller (DB + mail)
 */
router.post("/", contactLimiter, validateContact, controller.submitContact);

/**
 * GET /api/contact
 * Admin only - list stored submissions (header: x-admin-key)
 */
router.get("/", adminAuth, controller.getContacts);

/**
 * GET /api/contact/:id
 * Admin only - single submission
 */
router.get("/:id", adminAuth, controller.getContact);

module.exports = router;
