import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Bike from '../bike/bike';
import AboutUs from '../about/about';
import ContactUs from '../contact/contact';
import './homeafterlogin.css';

function HomeAfterLogin({ setToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null); // This updates state in App.jsx and re-renders everything
    navigate('/'); // Redirect to home
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
        <div className="container">
          <a className="navbar-brand" href="#home">
            <i className="bi bi-speedometer2 me-2"></i>MotoMatch
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#bikes">Bikes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/list">MyList</Link>
              </li>
            </ul>
            <button className="btn btn-outline-light ms-auto" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div id="home" className="hero-section">
        <div className="overlay">
          <h1 className="display-3 text-white">Welcome to MotoMatch</h1>
          <p className="lead text-white">
            Your personalized motorcycle search companion. Let’s find your perfect ride!
          </p>
        </div>
      </div>

      {/* Bikes Section */}
      <div id="bikes" className="section pt-5 mt-5" data-aos="fade-up">
        <Bike />
      </div>

      {/* About Us Section */}
      <div id="about" className="section p-5 bg-light" data-aos="fade-up">
        <AboutUs />
      </div>

      {/* Contact Section */}
      <div id="contact" className="section p-5" data-aos="fade-up">
        <ContactUs />
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3 mt-5">
        <p>Powered by MotoMatch | © {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}

export default HomeAfterLogin;
