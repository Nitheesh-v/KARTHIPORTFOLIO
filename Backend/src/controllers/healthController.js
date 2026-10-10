/**
 * healthController.js
 * ------------------------------------------------------------------
 * Uptime / readiness probe. Also reports whether MongoDB is connected,
 * which makes debugging a deployment much faster.
 * ------------------------------------------------------------------
 */

const mongoose = require("mongoose");
const { sendSuccess } = require("../utils/apiResponse");

// Mongoose readyState: 0 disconnected, 1 connected, 2 connecting, 3 disconnecting
const DB_STATES = ["disconnected", "connected", "connecting", "disconnecting"];

/** GET /api/health - is the API alive and is Mongo connected? */
const getHealth = (req, res) =>
  sendSuccess(res, 200, "API is healthy", {
    uptimeSeconds: Math.round(process.uptime()),
    database: DB_STATES[mongoose.connection.readyState] || "unknown",
    timestamp: new Date().toISOString(),
  });

module.exports = { getHealth };
