/**
 * env.js
 * ------------------------------------------------------------------
 * Loads the .env file ONCE and exports every configuration value as a
 * plain, typed JS object. The rest of the app never touches
 * `process.env` directly - it imports from here instead.
 * Benefit: one single place to see/validate all required settings.
 * ------------------------------------------------------------------
 */

const path = require("path");
const dotenv = require("dotenv");

// Load Backend/.env no matter which folder the process was started from
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const env = {
  // --- Server ---
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 5000,

  // Comma separated list of allowed frontend origins (CORS)
  // Example: "http://localhost:5173,https://karthickraja.dev"
  CLIENT_ORIGINS: (process.env.CLIENT_ORIGINS || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),

  // --- Database (MongoDB) ---
  MONGO_URI: process.env.MONGO_URI,
  DB_NAME: process.env.DB_NAME || "portfolio",

  // --- Mail (SMTP, e.g. Gmail App Password) ---
  SMTP_HOST: process.env.SMTP_HOST || "smtp.gmail.com",
  SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
  SMTP_SECURE: String(process.env.SMTP_SECURE || "false") === "true", // true for port 465
  SMTP_USER: process.env.SMTP_USER, // the mailbox used to SEND
  SMTP_PASS: process.env.SMTP_PASS, // app password (never a real password)

  // Where the contact notifications should land (your inbox)
  MAIL_TO: process.env.MAIL_TO || process.env.SMTP_USER,
  MAIL_FROM_NAME: process.env.MAIL_FROM_NAME || "Portfolio Contact Form",

  // --- Admin ---
  // Secret used by the x-admin-key header to read stored messages
  ADMIN_API_KEY: process.env.ADMIN_API_KEY || "",
};

/**
 * Fail fast: if a critical variable is missing we warn loudly at boot
 * instead of crashing later on the first request.
 */
const REQUIRED_KEYS = ["MONGO_URI", "SMTP_USER", "SMTP_PASS", "MAIL_TO"];

env.missingKeys = REQUIRED_KEYS.filter((key) => !env[key]);

module.exports = env;
