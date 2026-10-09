/**
 * api.config.js
 * ------------------------------------------------------------------
 * Central place for the API base URL + endpoint paths.
 *
 * In development we leave the base URL empty and call "/api/...",
 * so the Vite dev-server proxy (see vite.config.js) forwards the
 * request to http://localhost:5000 - no CORS issues at all.
 *
 * In production set VITE_API_BASE_URL in Frontend/.env, e.g.
 *   VITE_API_BASE_URL=https://your-backend.onrender.com
 * ------------------------------------------------------------------
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const API_ENDPOINTS = {
  contact: "/api/contact",
  health: "/api/health",
};

/** Join the base URL with an endpoint path. */
export const buildUrl = (path) => `${API_BASE_URL}${path}`;
