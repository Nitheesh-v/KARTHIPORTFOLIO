/**
 * scripts/inspectUri.js
 * ------------------------------------------------------------------
 * Shows WHY MONGO_URI fails with "bad auth" - without ever printing
 * the password, so its output is safe to share.
 *
 *   npm run inspect:uri
 * ------------------------------------------------------------------
 */

const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env");

if (!fs.existsSync(envPath)) {
  console.log("No Backend/.env found - copy .env.example to .env first.");
  process.exit(1);
}

const raw = fs.readFileSync(envPath, "utf8");

// Every line that sets MONGO_URI (dotenv only ever uses the FIRST one)
const lines = raw
  .split(/\r?\n/)
  .filter((line) => line.trim().startsWith("MONGO_URI"));

console.log(
  `MONGO_URI lines in .env: ${lines.length}` +
    (lines.length > 1
      ? "  <-- PROBLEM: only the FIRST line is used, delete the extras"
      : lines.length === 0
        ? "  <-- PROBLEM: MONGO_URI is missing"
        : "")
);

const value = lines[0] ? lines[0].slice(lines[0].indexOf("=") + 1) : "";

const problems = [];
if (lines.length && !value.trim()) problems.push("MONGO_URI is empty");
if (/<|>/.test(value)) problems.push("contains < > brackets (placeholder never replaced)");
if (/password/i.test(value)) problems.push('still contains the word "password" (placeholder never replaced)');
if (/\s/.test(value)) problems.push("contains spaces");
if (/^["']|["']$/.test(value)) problems.push("wrapped in quotes - remove them");

// Split the URI into user / password / rest (password stays masked)
const match = value.match(/\/\/([^:/?#]+):([^@]*)@/);

if (match) {
  const [, user, pass] = match;
  console.log("username in URI :", user);
  console.log(
    "password shape  :",
    `${pass.length} chars` +
      (/[^\w]/.test(pass)
        ? "  <-- has special chars; they must be URL-encoded (@ -> %40, # -> %23, / -> %2F, : -> %3A, ? -> %3F)"
        : " (letters/digits only - structurally OK)")
  );
} else if (value) {
  problems.push("no  username:password@  section found in the URI");
}

if (problems.length) {
  console.log("\nPROBLEMS FOUND:");
  problems.forEach((p) => console.log(" -", p));
  console.log("\nFix the MONGO_URI line in Backend/.env, then Ctrl+C and npm run dev again.");
} else if (value) {
  console.log(
    "\nNo structural problems -> the password itself is being rejected.",
    "\nFix: Atlas -> Database Access -> edit the user -> set a NEW letters+digits",
    "password, put that exact password in the URI, restart with npm run dev."
  );
}
