import { useState, useEffect } from "react";

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [affix, setAffix] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setAffix(true);
      } else {
        setAffix(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = (e, hash) => {
    e.preventDefault();
    const element = document.querySelector(hash);
    if (element) {
      setIsActive(false); // Close mobile menu if open
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`custom-navbar ${affix ? "affix" : ""}`}>
      <div className="container">
        <a
          className="logo"
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
        >
          Karthickraja K
        </a>
        <ul className={`nav ${isActive ? "show" : ""}`}>
          <li className="item">
            <a
              className="link"
              href="#home"
              onClick={(e) => handleLinkClick(e, "#home")}
            >
              Home
            </a>
          </li>
          <li className="item">
            <a
              className="link"
              href="#about"
              onClick={(e) => handleLinkClick(e, "#about")}
            >
              About
            </a>
          </li>
          <li className="item">
            <a
              className="link"
              href="#services"
              onClick={(e) => handleLinkClick(e, "#services")}
            >
              Services
            </a>
          </li>
          <li className="item">
            <a
              className="link"
              href="#portfolio"
              onClick={(e) => handleLinkClick(e, "#portfolio")}
            >
              Projects
            </a>
          </li>
          <li className="item">
            <a
              className="link"
              href="#experience"
              onClick={(e) => handleLinkClick(e, "#experience")}
            >
              Experience
            </a>
          </li>
          <li className="item">
            <a
              className="link"
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
            >
              Contact
            </a>
          </li>
        </ul>
        <a
          href="#"
          id="nav-toggle"
          className={`hamburger hamburger--elastic ${isActive ? "is-active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            setIsActive(!isActive);
          }}
        >
          <div className="hamburger-box">
            <div className="hamburger-inner"></div>
          </div>
        </a>
        <button
          className={`theme-switch-toggle ${darkMode ? "active" : ""}`}
          onClick={toggleDarkMode}
          aria-label="Toggle theme"
        >
          {/* Sky backgrounds */}
          <div className="sky-bg day-sky">
            <div className="cloud cloud-1"></div>
            <div className="cloud cloud-2"></div>
            <div className="cloud cloud-3"></div>
          </div>
          <div className="sky-bg night-sky">
            <div className="star star-1">★</div>
            <div className="star star-2">★</div>
            <div className="star star-3">★</div>
            <div className="star star-4">★</div>
            <div className="star star-5">★</div>
          </div>

          {/* Knob */}
          <div className="toggle-knob">
            <div className="sun-element"></div>
            <div className="moon-element">
              <div className="crater crater-1"></div>
              <div className="crater crater-2"></div>
              <div className="crater crater-3"></div>
            </div>
          </div>
        </button>
      </div>
    </nav>
  );
}
