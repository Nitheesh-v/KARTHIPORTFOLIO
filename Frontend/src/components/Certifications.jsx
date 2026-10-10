/**
 * Certifications - proof-of-work cards. Data taken verbatim from the resume.
 */
const CERTIFICATIONS_DATA = [
  {
    title: "Cloud Infrastructure",
    issuer: "Oracle University",
    year: "2024",
    icon: "ti-cloud",
  },
  {
    title: "UI Developer Certification",
    issuer: "Infosys Springboard",
    year: "2025",
    icon: "ti-paint-bucket",
  },
  {
    title: "Programming in Java",
    issuer: "NPTEL",
    year: "2024",
    icon: "ti-book",
  },
  {
    title: "Python Programming",
    issuer: "IPCS Automation",
    year: "2024",
    icon: "ti-blackboard",
  },
];

export default function Certifications() {
  return (
    <section className="section" id="certifications">
      <div className="container text-center">
        <h6 className="section-title mb-2">Certifications</h6>
        <p className="section-kicker mb-6">Verified skills, outside the classroom</p>
        <div className="row justify-content-center">
          {CERTIFICATIONS_DATA.map((cert, index) => (
            <div
              key={index}
              className="col-sm-6 col-lg-3 mb-4 d-flex align-items-stretch"
            >
              <div className="service-card w-100 p-4 cert-card">
                <div className="service-icon-wrap mb-3 cert-icon">
                  <i className={`ti ${cert.icon}`}></i>
                </div>
                <h6 className="title mb-1 cert-title">{cert.title}</h6>
                <p className="text-muted small mb-2">{cert.issuer}</p>
                <span className="cert-year">
                  <i className="ti-stamp" style={{ marginRight: 5 }}></i>
                  {cert.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
