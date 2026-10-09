/**
 * mailer.js
 * ------------------------------------------------------------------
 * Creates and caches a single Nodemailer SMTP transporter.
 * Keeping it in config/ means the mail SERVICE only deals with
 * "what to send", never with "how to connect".
 * ------------------------------------------------------------------
 */

const nodemailer = require("nodemailer");
const env = require("./env");
const logger = require("../utils/logger");

let transporter = null;

/**
 * Lazily build the transporter (created on first use, reused afterwards).
 * @returns {import("nodemailer").Transporter}
 */
function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE, // true -> 465 (SSL), false -> 587 (STARTTLS)
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });

  return transporter;
}

/**
 * Optional boot-time check so you know immediately whether the SMTP
 * credentials in .env are valid. Never throws - only logs.
 */
async function verifyMailer() {
  try {
    await getTransporter().verify();
    logger.success(`SMTP ready -> sending as ${env.SMTP_USER}`);
    return true;
  } catch (error) {
    logger.error("SMTP verification failed:", error.message);
    return false;
  }
}

module.exports = { getTransporter, verifyMailer };
