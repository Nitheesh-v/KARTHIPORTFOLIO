/**
 * CtaBanner - full-width call-to-action between content and contact.
 */
export default function CtaBanner() {
  const goTo = (e, hash) => {
    e.preventDefault();
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="cta-banner">
      <div className="container cta-inner">
        <h3 className="cta-title">Have a project or opportunity in mind?</h3>
        <p className="cta-text">
          I&apos;m open to full-time roles, internships, freelance work and
          collaborations — let&apos;s build something useful together.
        </p>
        <div className="cta-actions">
          <button className="btn btn-primary" onClick={(e) => goTo(e, "#contact")}>
            Get In Touch
          </button>
          <a
            className="btn cta-resume-btn"
            href="/resume/Karthickraja_K_Full_Stack_Developer_Resume.pdf"
            download
          >
            <i className="ti-download" style={{ marginRight: 8 }}></i>
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
}
