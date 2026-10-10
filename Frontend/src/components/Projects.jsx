export const PROJECTS_DATA = [
  {
    title: "GIMS – Grocery Inventory Management System",
    image: "/assets/imgs/gims_preview.png",
    description:
      "A full-stack inventory management system with real-time stock tracking, automated low-stock alerts, and secure role-based access control.",
    tech: ["React.js", "JavaScript", "HTML5", "CSS3", "REST API", "MySQL"],
    liveLink: "https://gims-7s7p.vercel.app",
    gitLink: "https://github.com/KARTHICK2320/GIMS",
  },
  {
    title: "Insane E-commerce",
    image: "/assets/imgs/insane_ecommerce_preview.png",
    description:
      "A Modern, Stylish Fashion E-Commerce Web Application Featuring Dynamic Collection Showcases and Seamless UI Interactions.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    liveLink: "https://insane-ecom.vercel.app",
    gitLink: "https://github.com/KARTHICK2320/insane-ecom",
  },
  {
    title: "EatandMeat",
    image: "/assets/imgs/EatandMeat.png",
    description:
      " EatandMeat is a full-stack food ordering platform where I developed the responsive React.js frontend, while the backend was developed with AI assistance, featuring product browsing, categories, authentication, cart, and order management.",
    tech: ["React.js", "JavaScript", "Node.js", "Express.js", "MongoDB", "REST API", "JWT Authentication"],
    liveLink: "https://eam-five.vercel.app/",
    gitLink: "https://github.com/KARTHICK2320/EatandMeat",
  },
];

export default function Projects() {
  return (
    <section className="section" id="portfolio">
      <div className="container">
        <div className="text-center mb-5">
          <h6 className="section-title">Featured Projects</h6>
        </div>
        <div className="row mt-5">
          {PROJECTS_DATA.map((item, index) => (
            <div
              key={index}
              className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex align-items-stretch"
            >
              <div className="project-card w-100">
                <div className="project-img-wrapper">
                  <img
                    src={item.image}
                    className="project-img"
                    alt={item.title}
                  />
                </div>
                <div className="project-card-body">
                  <div>
                    <h5
                      className="mb-2"
                      style={{
                        fontWeight: "600",
                        fontSize: "1.15rem",
                      }}
                    >
                      {item.title}
                    </h5>
                    <p
                      className="text-muted small mb-3"
                      style={{ fontSize: "0.88rem", lineHeight: "1.5" }}
                    >
                      {item.description}
                    </p>
                  </div>
                  <div>
                    <div className="d-flex flex-wrap mb-3">
                      {item.tech.map((t, idx) => (
                        <span key={idx} className="tech-badge">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="project-btn-group">
                      {item.liveLink && item.liveLink !== "#" ? (
                        <a
                          href={item.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-btn project-btn-primary"
                        >
                          Live Demo
                        </a>
                      ) : (
                        <span
                          className="project-btn project-btn-primary"
                          style={{
                            opacity: 0.5,
                            pointerEvents: "none",
                            cursor: "not-allowed",
                          }}
                        >
                          Coming Soon
                        </span>
                      )}
                      <a
                        href={item.gitLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn project-btn-secondary"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
