export default function Footer() {
  return (
    <div className="container">
      <footer className="footer">
        <p className="mb-0">
          Copyright {new Date().getFullYear()} &copy;{" "}
          <a href="#home" style={{ textDecoration: "none" }}>
            Karthickraja K
          </a>
        </p>
        <div className="social-links text-right m-auto ml-sm-auto">
          <a
            href="https://www.linkedin.com/in/karthickraja-k-140a06321"
            target="_blank"
            rel="noopener noreferrer"
            className="link mr-3"
          >
            <i className="ti-linkedin"></i>
          </a>
          <a
            href="https://github.com/KARTHICK2320"
            target="_blank"
            rel="noopener noreferrer"
            className="link mr-3"
          >
            <i className="ti-github"></i>
          </a>
          <a
            href="https://wa.me/916369831841"
            target="_blank"
            rel="noopener noreferrer"
            className="link mr-3"
          >
            <i className="ti-comment-alt"></i>
          </a>
          <a href="mailto:karthickr2304@gmail.com" className="link">
            <i className="ti-email"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}
