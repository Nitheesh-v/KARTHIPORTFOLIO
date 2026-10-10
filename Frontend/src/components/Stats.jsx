import { SKILLS_DATA } from "./Skills";
import { PROJECTS_DATA } from "./Projects";
import { EXPERIENCE_DATA } from "./Experience";

/**
 * Stats strip - honest numbers derived from the real portfolio data,
 * so they update automatically when projects/skills are added.
 */
export default function Stats() {
  const stats = [
    { value: PROJECTS_DATA.length, label: "Featured Projects" },
    { value: SKILLS_DATA.length, label: "Skills & Tools" },
    { value: EXPERIENCE_DATA.length, label: "Internships" },
    {
      value: PROJECTS_DATA.filter((p) => p.liveLink && p.liveLink !== "#")
        .length,
      label: "Live Demos",
    },
  ];

  return (
    <div className="stats-strip">
      <div className="container stats-grid">
        {stats.map((s, i) => (
          <div className="stat-item" key={i}>
            <span className="stat-value">
              {s.value}
              <span className="stat-plus">+</span>
            </span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
