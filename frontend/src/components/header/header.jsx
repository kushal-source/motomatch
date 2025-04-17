import './header.css';
import { Link, useNavigate } from 'react-router-dom';

function Header({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove token from localStorage
    setToken(null);  // Update token state in App.jsx
    navigate('/login');  // Redirect to login page after logout
  };

  return (
    <div id="home" className="hero-section">
      <div className="overlay">
        <h1 className="display-3 text-white">Welcome to MotoMatch</h1>
        <p className="lead text-white">Your personalized motorcycle search companion. Let’s find your perfect ride!</p>
        {!token ? (
          <Link to="/login" className="btn btn-outline-light mt-4 px-5 py-2 fs-5">
            Login
          </Link>
        ) : (
          <button onClick={handleLogout} className="btn btn-outline-light mt-4 px-5 py-2 fs-5">
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
