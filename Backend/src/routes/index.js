/**
 * routes/index.js
 * ------------------------------------------------------------------
 * Single router that mounts every feature router under /api.
 * Adding a new feature = one extra line here.
 * ------------------------------------------------------------------
 */

const express = require("express");

const contactRoutes = require("./contactRoutes");
const healthRoutes = require("./healthRoutes");

const router = express.Router();

router.use("/health", healthRoutes);   // GET  /api/health
router.use("/contact", contactRoutes); // POST /api/contact, GET /api/contact

module.exports = router;
