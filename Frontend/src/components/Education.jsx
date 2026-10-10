/**
 * Education - vertical timeline. Data taken verbatim from the resume.
 */
const EDUCATION_DATA = [
  {
    level: "B.E. Computer Science and Engineering",
    place: "RVS College of Engineering and Technology, Coimbatore",
    dates: "2022 – 2026",
    score: "CGPA: 7.64 / 10",
    icon: "ti-medall",
  },
  {
    level: "Higher Secondary Certificate",
    place: "N S Boys Higher Secondary School",
    dates: "Schooling",
    score: "71.17%",
    icon: "ti-book",
  },
];

export default function Education() {
  return (
    <section className="section" id="education">
      <div className="container text-center">
        <h6 className="section-title mb-2">Education</h6>
        <p className="section-kicker mb-6">Where the foundations were built</p>
        <div className="edu-timeline">
          {EDUCATION_DATA.map((edu, index) => (
            <div className="edu-item" key={index}>
              <div className="edu-dot">
                <i className={`ti ${edu.icon}`}></i>
              </div>
              <div className="edu-card service-card p-4 text-left">
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                  <h6 className="title mb-0 edu-level">{edu.level}</h6>
                  <span className="badge badge-primary edu-dates">
                    {edu.dates}
                  </span>
                </div>
                <p className="text-muted mb-2 edu-place">
                  <i className="ti-location-pin" style={{ marginRight: 6 }}></i>
                  {edu.place}
                </p>
                <span className="edu-score">{edu.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
