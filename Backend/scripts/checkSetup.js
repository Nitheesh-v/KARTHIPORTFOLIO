/**
 * scripts/checkSetup.js
 * ------------------------------------------------------------------
 * One-command diagnostic:  npm run check
 *
 *   1. are all required .env values present (and not placeholders)?
 *   2. can we reach MongoDB and write/read a document?
 *   3. are the SMTP credentials valid?
 *   4. optionally send a REAL test email:  npm run check -- --send
 *
 * Nothing here is used by the API at runtime - it only helps you
 * confirm the setup works before trusting the contact form.
 * ------------------------------------------------------------------
 */

const mongoose = require("mongoose");

const env = require("../src/config/env");
const logger = require("../src/utils/logger");
const { connectDB, disconnectDB } = require("../src/config/database");
const { verifyMailer } = require("../src/config/mailer");
const mailService = require("../src/services/mailService");

// `npm run check -- --send` also delivers a real email to MAIL_TO
const SHOULD_SEND = process.argv.includes("--send");

// Values copied straight from .env.example mean "not configured yet"
const PLACEHOLDERS = [
  "your.email@gmail.com",
  "your_16_char_app_password",
  "change_this_to_a_long_random_string",
];

/** 1. Configuration check ----------------------------------------- */
function checkEnv() {
  const problems = [];

  if (env.missingKeys.length) {
    problems.push(`missing values: ${env.missingKeys.join(", ")}`);
  }

  ["SMTP_USER", "SMTP_PASS", "MAIL_TO", "ADMIN_API_KEY"].forEach((key) => {
    if (PLACEHOLDERS.includes(env[key])) {
      problems.push(`${key} is still the example placeholder`);
    }
  });

  if (problems.length) {
    problems.forEach((p) => logger.error(`.env -> ${p}`));
    return false;
  }

  logger.success(".env looks complete");
  logger.info(`   MongoDB db : ${env.DB_NAME}`);
  logger.info(`   Sends as   : ${env.SMTP_USER}`);
  logger.info(`   Delivers to: ${env.MAIL_TO}`);
  return true;
}

/** 2. Database check ---------------------------------------------- */
async function checkDatabase() {
  await connectDB();

  // Write + read + delete a throwaway doc to prove full access
  const probe = mongoose.connection.collection("__setup_probe");
  const { insertedId } = await probe.insertOne({ at: new Date() });
  await probe.deleteOne({ _id: insertedId });

  const count = await mongoose.connection
    .collection("contacts")
    .countDocuments();

  logger.success(`MongoDB read/write OK - "contacts" has ${count} document(s)`);
}

/** 3 + 4. Mail check ---------------------------------------------- */
async function checkMail() {
  const ok = await verifyMailer();
  if (!ok) throw new Error("SMTP credentials rejected by the mail server");

  if (!SHOULD_SEND) {
    logger.info("Run `npm run check -- --send` to deliver a real test email");
    return;
  }

  await mailService.sendOwnerNotification({
    name: "Setup Test",
    email: env.MAIL_TO,
    message:
      "This is an automated test from scripts/checkSetup.js. " +
      "If you can read this, your portfolio contact form can email you.",
    createdAt: new Date(),
  });

  logger.success(`Test email delivered -> check the inbox of ${env.MAIL_TO}`);
}

/** Runner ---------------------------------------------------------- */
(async () => {
  let exitCode = 0;

  try {
    if (!checkEnv()) {
      logger.error("Fix Backend/.env first (see Backend/.env.example)");
      process.exit(1);
    }

    await checkDatabase();
    await checkMail();

    logger.success("All checks passed - the contact form is ready");
  } catch (error) {
    logger.error("Check failed:", error.message);
    exitCode = 1;
  } finally {
    await disconnectDB().catch(() => {});
    process.exit(exitCode);
  }
})();
