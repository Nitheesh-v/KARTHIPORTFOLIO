/**
 * server.js
 * ------------------------------------------------------------------
 * Application entry point:
 *   1. check the .env configuration
 *   2. connect to MongoDB
 *   3. verify the SMTP credentials
 *   4. start listening
 *   5. shut down gracefully on SIGINT / SIGTERM
 * ------------------------------------------------------------------
 */

const app = require("./app");
const env = require("./config/env");
const logger = require("./utils/logger");
const { connectDB, disconnectDB } = require("./config/database");
const { verifyMailer } = require("./config/mailer");

let server;

async function bootstrap() {
  // --- 1. configuration sanity check -----------------------------
  if (env.missingKeys.length) {
    logger.warn(
      `Missing .env values: ${env.missingKeys.join(", ")} ` +
        "- see Backend/.env.example"
    );
  }

  // --- 2. database ------------------------------------------------
  await connectDB();

  // --- 3. mail (non blocking: the API still boots if SMTP is wrong)
  if (env.SMTP_USER && env.SMTP_PASS) {
    await verifyMailer();
  } else {
    logger.warn("SMTP_USER / SMTP_PASS missing - emails will not be sent");
  }

  // --- 4. listen --------------------------------------------------
  server = app.listen(env.PORT, "0.0.0.0", () => {
    logger.success(
      `Server running in ${env.NODE_ENV} mode on http://localhost:${env.PORT}`
    );
  });
}

/** Close HTTP server + DB connection before exiting. */
async function shutdown(signal) {
  logger.warn(`${signal} received - shutting down gracefully...`);
  if (server) server.close();
  await disconnectDB().catch(() => {});
  process.exit(0);
}

["SIGINT", "SIGTERM"].forEach((signal) =>
  process.on(signal, () => shutdown(signal))
);

// Last resort safety nets
process.on("unhandledRejection", (reason) =>
  logger.error("Unhandled promise rejection:", reason)
);
process.on("uncaughtException", (error) => {
  logger.error("Uncaught exception:", error.message);
  process.exit(1);
});

bootstrap().catch((error) => {
  logger.error("Failed to start server:", error.message);
  process.exit(1);
});
