/**
 * logger.js
 * ------------------------------------------------------------------
 * Tiny console logger with timestamps + colors.
 * (Keeps the codebase dependency-free for logging; swap with winston
 * later without touching any call site.)
 * ------------------------------------------------------------------
 */

const COLORS = {
  reset: "\x1b[0m",
  gray: "\x1b[90m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

/** Build a "[HH:MM:SS] LEVEL" prefix. */
function prefix(label, color) {
  const time = new Date().toISOString().split("T")[1].replace("Z", "");
  return `${COLORS.gray}[${time}]${COLORS.reset} ${color}${label}${COLORS.reset}`;
}

module.exports = {
  info: (...args) => console.log(prefix("INFO ", COLORS.cyan), ...args),
  success: (...args) => console.log(prefix("OK   ", COLORS.green), ...args),
  warn: (...args) => console.warn(prefix("WARN ", COLORS.yellow), ...args),
  error: (...args) => console.error(prefix("ERROR", COLORS.red), ...args),
};
