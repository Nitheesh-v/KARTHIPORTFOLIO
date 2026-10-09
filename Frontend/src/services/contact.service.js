/**
 * contact.service.js (frontend)
 * ------------------------------------------------------------------
 * All contact-form API calls in one module.
 * Components import this - they never call fetch() directly.
 * ------------------------------------------------------------------
 */

import { http } from "./httpClient";
import { API_ENDPOINTS } from "../config/api.config";

/**
 * STEP 1: send the form data from the frontend to the backend.
 * STEP 3: return the backend's answer to the component.
 *
 * @param {{name:string,email:string,message:string}} formData
 * @returns {Promise<{success:boolean,message:string,data:any,errors:object|null}>}
 */
export async function submitContactForm(formData) {
  return http.post(API_ENDPOINTS.contact, {
    name: formData.name,
    email: formData.email,
    message: formData.message,
  });
}

/** Simple ping used to check that the API is reachable. */
export async function checkApiHealth() {
  return http.get(API_ENDPOINTS.health);
}
