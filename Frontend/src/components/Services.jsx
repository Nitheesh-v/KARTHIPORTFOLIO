/**
 * Services - "What I Do" cards.
 * Every card is derived from real experience/skills already on this site
 * (React UIs, REST integration, MySQL/MongoDB, XSS-safe validation, Git).
 */
const SERVICES_DATA = [
  {
    icon: "ti-layers",
    title: "Full-Stack Development",
    description:
      "End-to-end MERN applications - React frontends, Node/Express APIs and MongoDB storage, wired together cleanly.",
  },
  {
    icon: "ti-desktop",
    title: "Responsive UI Engineering",
    description:
      "Mobile-first, cross-browser interfaces built with React components, HTML5 and modern CSS3.",
  },
  {
    icon: "ti-link",
    title: "REST API Design & Integration",
    description:
      "Clean endpoints with validation and consistent error handling, plus smooth third-party API integration.",
  },
  {
    icon: "ti-server",
    title: "Database Design",
    description:
      "Relational schemas in MySQL and document models in MongoDB for real, production-shaped data.",
  },
  {
    icon: "ti-target",
    title: "Secure Forms & Validation",
    description:
      "XSS-safe input handling, sanitization and both client- and server-side validation.",
  },
  {
    icon: "ti-settings",
    title: "Git-Based Delivery",
    description:
      "Version-controlled workflows with GitHub and fast, Vite-powered build pipelines.",
  },
];

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container text-center">
        <h6 className="section-title mb-2">What I Do</h6>
        <p className="section-kicker mb-6">
          The work I enjoy, and deliver
        </p>
        <div className="row justify-content-center">
          {SERVICES_DATA.map((service, index) => (
            <div
              key={index}
              className="col-sm-6 col-md-4 mb-4 d-flex align-items-stretch"
            >
              <div className="service-card w-100 p-4 service-item">
                <div className="service-icon-wrap mb-3">
                  <i className={`ti ${service.icon}`}></i>
                </div>
                <h6 className="title mb-2 service-title">{service.title}</h6>
                <p className="text-muted mb-0 small service-description">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
