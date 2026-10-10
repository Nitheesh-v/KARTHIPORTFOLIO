export const EXPERIENCE_DATA = [
  {
    role: "Frontend Developer Intern",
    company: "Pargavan Cyber Solutions, Coimbatore",
    dates: "2025 – 2026",
    points: [
      "Architected the GIMS frontend using React.js and JavaScript (ES6+) with a component-based architecture spanning Dashboard, Inventory, Alerts, and Reports modules, enabling real-time inventory auditing and role-based data management.",
      "Built reusable React components with state management via React Hooks and Context API, improving rendering efficiency and reducing code duplication across the application.",
      "Integrated REST APIs for live stock data flow; implemented XSS-safe form validation and input sanitization to protect sensitive operational data from injection vulnerabilities.",
    ],
  },
  {
    role: "Automation Intern",
    company: "IPCS Automation, Coimbatore",
    dates: "2024",
    points: [
      "Built Python scripts for data processing and workflow automation.",
      "Gained hands-on exposure to PLC integration and real-time industrial data monitoring.",
    ],
  },
];

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container text-center">
        <h6 className="section-title mb-6">Experience</h6>
        {EXPERIENCE_DATA.map((exp, index) => (
          <div key={index} className="blog-card experience-card">
            <div className="blog-card-body">
              <h5 className="blog-card-title">{exp.role}</h5>
              <p className="blog-card-caption">
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <i
                    className="ti-briefcase"
                    style={{ marginRight: "5px" }}
                  ></i>
                  {exp.company}
                </a>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <i className="ti-calendar" style={{ marginRight: "5px" }}></i>
                  {exp.dates}
                </a>
              </p>
              <ul
                style={{
                  textAlign: "left",
                  paddingLeft: "20px",
                  marginTop: "15px",
                }}
              >
                {exp.points.map((point, pIndex) => (
                  <li
                    key={pIndex}
                    style={{
                      marginBottom: "10px",
                      fontSize: "0.95rem",
                    }}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
