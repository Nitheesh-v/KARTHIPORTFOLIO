import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Log form values to console for demonstration
    console.log("Contact Form Submitted:", { name, email, message });
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setSubmitted(false), 5000);
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
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-sm-6">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-sm-12">
                  <textarea
                    name="comment"
                    id="comment"
                    rows="6"
                    className="form-control"
                    placeholder="Write Something"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="form-group col-sm-12 mt-3 text-right">
                  <input
                    type="submit"
                    value="Send Message"
                    className="btn btn-outline-primary rounded"
                  />
                </div>
              </div>
              {submitted && (
                <div
                  className="alert alert-success mt-3"
                  role="alert"
                  style={{ display: "block" }}
                >
                  Thank you! Your message has been sent successfully.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
