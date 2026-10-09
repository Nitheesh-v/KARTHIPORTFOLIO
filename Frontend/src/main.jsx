import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Import CSS stylesheets in correct cascade order
import "./css/App.css";
import "./css/Navbar.css";
import "./css/Hero.css";
import "./css/About.css";
import "./css/Skills.css";
import "./css/Projects.css";
import "./css/Experience.css";
import "./css/Contact.css";
import "./css/Footer.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
