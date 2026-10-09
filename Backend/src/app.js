/**
 * app.js
 * ------------------------------------------------------------------
 * Builds and configures the Express application (middlewares, routes,
 * error handling). It does NOT listen on a port - that is server.js'
 * job - which keeps the app easily testable.
 * ------------------------------------------------------------------
 */

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const env = require("./config/env");
const routes = require("./routes");
const notFound = require("./middlewares/notFound.middleware");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

/* ------------------------------------------------------------------
 * 1. Security + platform middlewares
 * ----------------------------------------------------------------*/
app.set("trust proxy", 1); // correct req.ip behind a proxy (Render/Nginx)
app.disable("x-powered-by");
app.use(helmet()); // sensible security headers

/* ------------------------------------------------------------------
 * 2. CORS - only the configured frontend origins may call the API
 * ----------------------------------------------------------------*/
app.use(
  cors({
    origin(origin, callback) {
      // Allow server-to-server / curl / Postman requests (no Origin header)
      if (!origin) return callback(null, true);

      // Allow anything in development to keep local setup painless
      if (env.NODE_ENV === "development") return callback(null, true);

      if (env.CLIENT_ORIGINS.includes(origin)) return callback(null, true);

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-admin-key"],
  })
);

/* ------------------------------------------------------------------
 * 3. Body parsers (STEP 1: the JSON sent by the React form lands here)
 * ----------------------------------------------------------------*/
app.use(express.json({ limit: "10kb" })); // small limit = less abuse surface
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

/* ------------------------------------------------------------------
 * 4. Request logging
 * ----------------------------------------------------------------*/
app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));

/* ------------------------------------------------------------------
 * 5. Routes
 * ----------------------------------------------------------------*/
app.get("/", (req, res) =>
  res.json({
    success: true,
    message: "Karthickraja portfolio API",
    endpoints: {
      health: "GET /api/health",
      submitContact: "POST /api/contact",
      listContacts: "GET /api/contact (header: x-admin-key)",
    },
  })
);

app.use("/api", routes);

/* ------------------------------------------------------------------
 * 6. 404 + global error handler (always registered LAST)
 * ----------------------------------------------------------------*/
app.use(notFound);
app.use(errorHandler);

module.exports = app;
