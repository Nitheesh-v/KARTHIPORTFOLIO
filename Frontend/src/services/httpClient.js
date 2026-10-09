/**
 * httpClient.js
 * ------------------------------------------------------------------
 * Thin fetch wrapper used by every service file.
 * Responsibilities:
 *   - set JSON headers
 *   - abort the request after a timeout
 *   - always return the API envelope { success, message, data, errors }
 *   - turn network / HTTP failures into the SAME shape, so components
 *     never have to deal with try/catch noise.
 * ------------------------------------------------------------------
 */

import { buildUrl } from "../config/api.config";

const DEFAULT_TIMEOUT = 15000; // 15 seconds

/**
 * Perform an HTTP request.
 * @param {string} path    endpoint path, e.g. "/api/contact"
 * @param {object} options { method, body, headers, timeout }
 * @returns {Promise<{success:boolean,message:string,data:any,errors:object|null,status:number}>}
 */
export async function request(path, options = {}) {
  const {
    method = "GET",
    body,
    headers = {},
    timeout = DEFAULT_TIMEOUT,
  } = options;

  // AbortController lets us cancel a hanging request
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(buildUrl(path), {
      method,
      headers: { "Content-Type": "application/json", ...headers },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    // The API always answers JSON; guard anyway (proxy errors, HTML pages...)
    const payload = await response.json().catch(() => ({}));

    return {
      success: response.ok && payload.success !== false,
      message: payload.message || (response.ok ? "Success" : "Request failed"),
      data: payload.data ?? null,
      errors: payload.errors ?? null,
      status: response.status,
    };
  } catch (error) {
    // Network down, CORS, or timeout (AbortError)
    const aborted = error.name === "AbortError";
    return {
      success: false,
      message: aborted
        ? "The request timed out. Please try again."
        : "Unable to reach the server. Please check your connection.",
      data: null,
      errors: null,
      status: 0,
    };
  } finally {
    clearTimeout(timer);
  }
}

export const http = {
  get: (path, options) => request(path, { ...options, method: "GET" }),
  post: (path, body, options) => request(path, { ...options, method: "POST", body }),
};
