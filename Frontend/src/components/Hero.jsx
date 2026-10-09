export default function Hero({ darkMode }) {
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
        <p className="header-subtitle">Full-Stack Developer</p>
        <button className="btn btn-primary" onClick={handleScrollToWorks}>
          Visit My Works
        </button>
      </div>
    </header>
  );
}
