import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

    // Validation
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
          // ✅ Store token and navigate
          localStorage.setItem('token', data.token);
          navigate('/home');
          window.location.reload(); // To refresh and reflect new login status
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
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-5 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4 text-center">Login to MotoMatch</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
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
          <div className="mb-3">
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
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Login
          </button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
