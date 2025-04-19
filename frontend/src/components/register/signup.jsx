import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './signup.css'; // 👈 Make sure this line is added

function Signup() {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const validateInputs = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    let errors = {};

    if (!/^[A-Za-z][A-Za-z ]*$/.test(name)) {
      errors.name = 'Name must start with a letter and contain only letters or spaces.';
    }

    if (!/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/.test(email)) {
      errors.email = 'Email must be a valid address ending in @gmail.com or @yahoo.com';
    }

    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(password)) {
      errors.password = 'Password must be at least 8 characters long and include at least one number and one special character.';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // 👉 Store user info in localStorage for use in ContactUs
          localStorage.setItem("user", JSON.stringify({ name, email }));

          alert('Signup successful!');
          navigate('/login');
        } else {
          alert(data.message || 'Signup failed');
        }
      } catch (err) {
        console.error(err);
        alert('An error occurred during signup');
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-overlay">
        <div className="signup-card">
          <h2 className="text-center">🏍️ Join MotoMatch</h2>
          <p className="text-center mb-4">Create your biker profile</p>
          <form onSubmit={validateInputs}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                name="name"
                required
              />
              {formErrors.name && <small className="text-danger">{formErrors.name}</small>}
            </div>

            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                required
              />
              {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
            </div>

            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Create password"
                name="password"
                required
              />
              {formErrors.password && <small className="text-danger">{formErrors.password}</small>}
            </div>

            <button type="submit" className="btn btn-dark w-100 mt-4">
              🧑‍🔧 Sign Up
            </button>
          </form>
          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
