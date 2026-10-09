/**
 * database.js
 * ------------------------------------------------------------------
 * MongoDB connection handling (via Mongoose).
 * Exposes:
 *   connectDB()    -> opens the connection (called once in server.js)
 *   disconnectDB() -> closes it (used on graceful shutdown)
 * ------------------------------------------------------------------
 */

const mongoose = require("mongoose");
const env = require("./env");
const logger = require("../utils/logger");

// Mongoose 7+ : throw on unknown fields instead of silently ignoring them
mongoose.set("strictQuery", true);

/**
 * Open the MongoDB connection.
 * @returns {Promise<typeof mongoose>}
 */
async function connectDB() {
  if (!env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in Backend/.env");
  }

  // Log connection lifecycle events (useful while developing)
  mongoose.connection.on("connected", () =>
    logger.success(`MongoDB connected -> db: ${mongoose.connection.name}`)
  );
  mongoose.connection.on("error", (err) =>
    logger.error("MongoDB connection error:", err.message)
  );
  mongoose.connection.on("disconnected", () =>
    logger.warn("MongoDB disconnected")
  );

  return mongoose.connect(env.MONGO_URI, {
    dbName: env.DB_NAME,
    serverSelectionTimeoutMS: 10000, // fail fast if the cluster is unreachable
  });
}

/** Close the MongoDB connection (graceful shutdown). */
async function disconnectDB() {
  await mongoose.connection.close();
}

module.exports = { connectDB, disconnectDB };
