import { useState } from "react";
import { submitContactForm } from "../services/contact.service";

/**
 * Contact section.
 * Flow: collect the form data -> POST it to the backend API
 *       -> show the backend's response (success / field errors).
 */
export default function Contact() {
  // ---- form state (STEP 1: data collected in the frontend) ----
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // ---- request state ----
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: "success" | "error", text }
  const [fieldErrors, setFieldErrors] = useState({}); // { name?, email?, message? }

  /** Generic change handler for all inputs (uses the input "name" attr). */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the error of the field being edited
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  /** Submit -> backend -> feedback. */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setFeedback(null);
    setFieldErrors({});

    // STEP 1 + 2: send to the API (which saves to MongoDB and emails me)
    const response = await submitContactForm(form);

    // STEP 3: use the data returned by the backend
    if (response.success) {
      setFeedback({ type: "success", text: response.message });
      setForm({ name: "", email: "", message: "" }); // reset the form
      setTimeout(() => setFeedback(null), 6000);
    } else {
      setFeedback({ type: "error", text: response.message });
      if (response.errors) setFieldErrors(response.errors);
    }

    setLoading(false);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="text-center">
          <p className="section-subtitle">How can you communicate?</p>
          <h6 className="section-title mb-5">Contact Me</h6>
        </div>
        <div className="row justify-content-center mt-5">
          {/* Left Column: Contact details */}
          <div className="col-md-4 mb-5 mb-md-0 text-left">
            <h5 className="mb-4" style={{ fontWeight: "600" }}>
              Get in Touch
            </h5>

            <div
              className="d-flex align-items-center mb-4 p-2 contact-item"
              style={{ cursor: "pointer" }}
            >
              <div
                className="text-primary mr-3 d-flex align-items-center justify-content-center contact-icon"
                style={{
                  width: "45px",
                  height: "45px",
                  backgroundColor: "rgba(105, 90, 166, 0.1)",
                  borderRadius: "50%",
                }}
              >
                <i className="ti-mobile" style={{ fontSize: "1.3rem" }}></i>
              </div>
              <div>
                <h6
                  className="mb-0"
                  style={{ fontSize: "0.95rem", fontWeight: "600" }}
                >
                  Phone
                </h6>
                <a
                  href="tel:+916369831841"
                  className="text-muted small"
                  style={{ textDecoration: "none", transition: "color 0.3s" }}
                >
                  +91 63698 31841
                </a>
              </div>
            </div>

            <div
              className="d-flex align-items-center mb-4 p-2 contact-item"
              style={{ cursor: "pointer" }}
            >
              <div
                className="text-primary mr-3 d-flex align-items-center justify-content-center contact-icon"
                style={{
                  width: "45px",
                  height: "45px",
                  backgroundColor: "rgba(105, 90, 166, 0.1)",
                  borderRadius: "50%",
                }}
              >
                <i className="ti-email" style={{ fontSize: "1.3rem" }}></i>
              </div>
              <div>
                <h6
                  className="mb-0"
                  style={{ fontSize: "0.95rem", fontWeight: "600" }}
                >
                  Email
                </h6>
                <a
                  href="mailto:karthickr2304@gmail.com"
                  className="text-muted small"
                  style={{ textDecoration: "none", transition: "color 0.3s" }}
                >
                  karthickr2304@gmail.com
                </a>
              </div>
            </div>

            <div
              className="d-flex align-items-center mb-4 p-2 contact-item"
              style={{ cursor: "pointer" }}
            >
              <div
                className="text-primary mr-3 d-flex align-items-center justify-content-center contact-icon"
                style={{
                  width: "45px",
                  height: "45px",
                  backgroundColor: "rgba(105, 90, 166, 0.1)",
                  borderRadius: "50%",
                }}
              >
                <i className="ti-linkedin" style={{ fontSize: "1.3rem" }}></i>
              </div>
              <div>
                <h6
                  className="mb-0"
                  style={{ fontSize: "0.95rem", fontWeight: "600" }}
                >
                  LinkedIn
                </h6>
                <a
                  href="https://www.linkedin.com/in/karthickraja-k-140a06321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted small"
                  style={{ textDecoration: "none", transition: "color 0.3s" }}
                >
                  Karthickraja K
                </a>
              </div>
            </div>

            <div
              className="d-flex align-items-center mb-4 p-2 contact-item"
              style={{ cursor: "pointer" }}
            >
              <div
                className="text-primary mr-3 d-flex align-items-center justify-content-center contact-icon"
                style={{
                  width: "45px",
                  height: "45px",
                  backgroundColor: "rgba(105, 90, 166, 0.1)",
                  borderRadius: "50%",
                }}
              >
                <i
                  className="ti-comment-alt"
                  style={{ fontSize: "1.3rem" }}
                ></i>
              </div>
              <div>
                <h6
                  className="mb-0"
                  style={{ fontSize: "0.95rem", fontWeight: "600" }}
                >
                  WhatsApp
                </h6>
                <a
                  href="https://wa.me/916369831841"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted small"
                  style={{ textDecoration: "none", transition: "color 0.3s" }}
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="col-md-8">
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-row">
                {/* --- Name --- */}
                <div className="form-group col-sm-6">
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${fieldErrors.name ? "is-invalid" : ""}`}
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                  {fieldErrors.name && (
                    <small className="text-danger">{fieldErrors.name}</small>
                  )}
                </div>

                {/* --- Email --- */}
                <div className="form-group col-sm-6">
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${fieldErrors.email ? "is-invalid" : ""}`}
                    placeholder="Enter Email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                  {fieldErrors.email && (
                    <small className="text-danger">{fieldErrors.email}</small>
                  )}
                </div>

                {/* --- Message --- */}
                <div className="form-group col-sm-12">
                  <textarea
                    name="message"
                    id="message"
                    rows="6"
                    className={`form-control ${fieldErrors.message ? "is-invalid" : ""}`}
                    placeholder="Write Something"
                    value={form.message}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  ></textarea>
                  {fieldErrors.message && (
                    <small className="text-danger">{fieldErrors.message}</small>
                  )}
                </div>

                {/* --- Submit --- */}
                <div className="form-group col-sm-12 mt-3 text-right">
                  <button
                    type="submit"
                    className="btn btn-outline-primary rounded"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </div>

              {/* --- STEP 3: feedback returned by the backend --- */}
              {feedback && (
                <div
                  className={`alert mt-3 ${
                    feedback.type === "success" ? "alert-success" : "alert-danger"
                  }`}
                  role="alert"
                  style={{ display: "block" }}
                >
                  {feedback.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
