export const SKILLS_DATA = [
  // Frontend
  {
    title: "React.js",
    category: "Frontend",
    icon: "/assets/imgs/rejs.png",
    description:
      "Building dynamic, modular, and component-based user interfaces.",
  },
  {
    title: "JavaScript (ES6+)",
    category: "Frontend",
    icon: "/assets/imgs/download.png",
    description:
      "Writing modern scripting logic for client-side interactions and state.",
  },
  {
    title: "HTML5",
    category: "Frontend",
    icon: "/assets/imgs/html-5.png",
    description:
      "Structuring web content semantically for accessibility and SEO.",
  },
  {
    title: "CSS3",
    category: "Frontend",
    icon: "/assets/imgs/css-3.png",
    description: "Styling layout presentation and responsive page design.",
  },
  {
    title: "Responsive Web Design",
    category: "Frontend",
    icon: "/assets/imgs/responsive.png",
    description:
      "Optimizing website interface for all mobile, tablet, and desktop screens.",
  },
  // Database
  {
    title: "MySQL",
    category: "Database",
    icon: "/assets/imgs/mysql-database.png",
    description: "Structuring relational databases and executing query logic.",
  },
  // Programming
  {
    title: "Java",
    category: "Programming",
    icon: "/assets/imgs/java.png",
    description:
      "Developing robust backend logic using object-oriented principles.",
  },
  {
    title: "Python",
    category: "Programming",
    icon: "/assets/imgs/py.png",
    description: "Creating scripts for data manipulation and task automation.",
  },
  // Tools
  {
    title: "Git",
    category: "Tools",
    icon: "/assets/imgs/git.png",
    description: "Tracking file histories and managing codebase changes.",
  },
  {
    title: "GitHub",
    category: "Tools",
    icon: "/assets/imgs/github.png",
    description: "Hosting repositories and managing dev workflows.",
  },
  {
    title: "VS Code",
    category: "Tools",
    icon: "/assets/imgs/vscode.png",
    description: "Developing in a custom text editor environment.",
  },
  {
    title: "Vite",
    category: "Tools",
    icon: "/assets/imgs/vite.png",
    description: "Bundling modules and running local development servers fast.",
  },
];

export default function Skills() {
  return (
    <section className="section" id="service">
      <div className="container text-center">
        <h6 className="section-title mb-6">Skills</h6>
        <div className="row justify-content-center">
          {SKILLS_DATA.map((skill, index) => (
            <div
              key={index}
              className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch"
            >
              <div className="service-card w-100 p-4 skills-card">
                <div className="body text-center d-flex flex-column align-items-center h-100 justify-content-between skills-body">
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src={skill.icon}
                      alt={skill.title}
                      className="icon mb-3 skills-icon"
                    />
                    <h6 className="title mb-2 skills-title">{skill.title}</h6>
                    <span className="badge badge-primary mb-3 skills-badge">
                      {skill.category}
                    </span>
                  </div>
                  <p className="text-muted text-center mb-0 skills-description">
                    {skill.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
