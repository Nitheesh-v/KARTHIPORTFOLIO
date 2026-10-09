/**
 * contact.service.js (frontend)
 * ------------------------------------------------------------------
 * All contact-form API calls in one module.
 * Components import this - they never call fetch() directly.
 *
 * When VITE_USE_MOCK_API=true the calls are answered by local mock
 * data instead of the backend (see src/mocks/contact.mock.js).
 * ------------------------------------------------------------------
 */

import { http } from "./httpClient";
import { API_ENDPOINTS } from "../config/api.config";
import {
  USE_MOCK_API,
  mockSubmitContactForm,
  mockCheckApiHealth,
} from "../mocks/contact.mock";

/**
 * STEP 1: send the form data from the frontend to the backend.
 * STEP 3: return the backend's answer to the component.
 *
 * @param {{name:string,email:string,message:string}} formData
 * @returns {Promise<{success:boolean,message:string,data:any,errors:object|null}>}
 */
export async function submitContactForm(formData) {
  if (USE_MOCK_API) return mockSubmitContactForm(formData);

  return http.post(API_ENDPOINTS.contact, {
    name: formData.name,
    email: formData.email,
    message: formData.message,
  });
}

/** Simple ping used to check that the API is reachable. */
export async function checkApiHealth() {
  if (USE_MOCK_API) return mockCheckApiHealth();

  return http.get(API_ENDPOINTS.health);
}
