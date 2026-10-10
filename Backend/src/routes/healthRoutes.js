/**
 * healthRoutes.js
 * ------------------------------------------------------------------
 * GET /api/health - uptime / readiness probe.
 * The handler itself lives in controllers/healthController.js.
 * ------------------------------------------------------------------
 */

const express = require("express");
const { getHealth } = require("../controllers/healthController");

const router = express.Router();

router.get("/", getHealth); // GET /api/health

module.exports = router;
