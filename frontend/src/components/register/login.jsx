import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailTrimmed = email.trim();
    const passwordTrimmed = password.trim();

    let errors = {};

    if (!/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/.test(emailTrimmed)) {
      errors.email = 'Please enter a valid email address ending with @gmail.com or @yahoo.com';
    }

    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(passwordTrimmed)) {
      errors.password = 'Password must be at least 8 characters long and include at least one number and one special character';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: emailTrimmed, password: passwordTrimmed }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.token);
          navigate('/home');
          window.location.reload();
        } else {
          setFormErrors({ password: data.message || 'Login failed' });
        }
      } catch (err) {
        console.error(err);
        setFormErrors({ password: 'An error occurred during login' });
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-overlay">
        <div className="login-card">
          <h2 className="text-center">🏍️ Welcome to MotoMatch</h2>
          <p className="text-center mb-4">Login to explore your next ride</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {formErrors.password && <small className="text-danger">{formErrors.password}</small>}
            </div>
            <button type="submit" className="btn btn-warning w-100 mt-4">
              🛵 Login
            </button>
          </form>
          <p className="mt-3 text-center">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
