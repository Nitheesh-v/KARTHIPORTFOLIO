import { useEffect, useState } from "react";

const ROLES = [
  "Full-Stack Developer",
  "React.js Developer",
  "MERN Stack Developer",
  "Problem Solver",
];

export default function Hero({ darkMode }) {
  const [typed, setTyped] = useState("");

  // Small typewriter loop over the role list (type, pause, delete, next)
  useEffect(() => {
    let role = 0;
    let char = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const current = ROLES[role];
      char += deleting ? -1 : 1;
      setTyped(current.slice(0, char));

      let delay = deleting ? 45 : 95;
      if (!deleting && char === current.length) {
        delay = 1600; // hold the full word
        deleting = true;
      } else if (deleting && char === 0) {
        deleting = false;
        role = (role + 1) % ROLES.length;
        delay = 350;
      }
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollToWorks = (e) => {
    e.preventDefault();
    const element = document.querySelector("#portfolio");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header id="home" className="header">
      <div className="overlay"></div>
      <div className="header-content container">
        <h1 className="header-title">
          <span className="up">Hii!</span>
          <span className="down">
            This is<span className="name-focus">Karthickraja</span>
          </span>
        </h1>
        <p className="header-subtitle">
          <span className="typed-role">{typed}</span>
          <span className="type-caret"></span>
        </p>
        <button className="btn btn-primary" onClick={handleScrollToWorks}>
          Visit My Works
        </button>
      </div>
    </header>
  );
}
