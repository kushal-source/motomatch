// Header.jsx

import './header.css';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <section className="header d-flex align-items-center justify-content-center text-center">
      <div className="title text-white">
        <h1 className="display-2 fw-bold">MotoMatch</h1>
        <p className="lead">Find the best bike for you</p>
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
    </section>
  );
}

export default Header;
