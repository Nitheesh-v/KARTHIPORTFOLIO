export default function About() {
  return (
    <section className="section pt-0" id="about">
      <div className="container text-center">
        <h6 className="section-title mb-6">About Me</h6>
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-12">
            <div className="service-card text-left p-4 p-md-5 about-me-box">
              <div className="row align-items-center">
                <div className="col-md-4 text-center mb-4 mb-md-0">
                  <div
                    className="m-auto"
                    style={{ width: "100%", maxWidth: "230px" }}
                  >
                    <img
                      src="/assets/imgs/man.jpg"
                      className="about-img"
                      alt="Karthickraja K"
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                        borderRadius: "0px !important",
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <h4 className="title mb-3" style={{ fontSize: "1.6rem" }}>
                    Karthickraja K
                  </h4>
                  <h6
                    className="text-primary mb-3"
                    style={{ fontWeight: "600" }}
                  >
                    Full Stack Developer
                  </h6>
                  <p
                    className="text-muted"
                    style={{ lineHeight: "1.6", fontSize: "0.95rem" }}
                  >
                    Full Stack Developer with hands-on experience in building
                    component-based applications using React.js, creating
                    responsive user interfaces, and implementing REST API
                    integrations. During my internship as a Full Stack Web
                    Developer, I successfully delivered production-grade
                    features, including real-time dashboards, state management,
                    form validation, and automated alert systems. Proficient in
                    JavaScript (ES6+), HTML5, CSS3, and React.js, I possess a
                    strong understanding of web security fundamentals, XSS
                    prevention, and performance optimization.
                  </p>


                  <div className="mt-4 d-flex flex-wrap align-items-center justify-content-between">
                    <a
                      href="dist/resume/Karthickraja_K_Full_Stack_Developer_Resume.pdf"
                      download
                      className="btn btn-primary btn-rounded"
                      style={{ textDecoration: "none", padding: "10px 25px" }}
                    >
                      Download Resume
                    </a>
                    <div className="social-links mt-3 mt-sm-0">
                      <a
                        href="https://www.linkedin.com/in/karthickraja-k-140a06321"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link mr-3"
                        style={{ fontSize: "1.2rem", color: "#695aa6" }}
                      >
                        <i className="ti-linkedin"></i>
                      </a>
                      <a
                        href="https://github.com/KARTHICK2320"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link"
                        style={{ fontSize: "1.2rem", color: "#695aa6" }}
                      >
                        <i className="ti-github"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
