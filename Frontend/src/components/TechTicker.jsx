/**
 * TechTicker - infinite horizontal marquee of the tech stack.
 * Pure CSS animation; the list is duplicated once for a seamless loop.
 */
const TECH = [
  "React.js",
  "JavaScript ES6+",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "HTML5",
  "CSS3",
  "Java",
  "Python",
  "Git & GitHub",
  "Vite",
  "REST APIs",
  "JWT Auth",
];

export default function TechTicker() {
  const items = [...TECH, ...TECH]; // duplicated for the seamless loop

  return (
    <div className="tech-ticker" aria-hidden="true">
      <div className="ticker-track">
        {items.map((tech, i) => (
          <span className="ticker-item" key={i}>
            {tech}
            <span className="ticker-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
