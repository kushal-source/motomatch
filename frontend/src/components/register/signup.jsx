import { Link } from 'react-router-dom';
import { useState } from 'react';

function Signup() {
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
          alert('Signup successful!');
          // You can also redirect user to login page
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
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-5 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4 text-center">Create Your Account</h2>
        <form onSubmit={validateInputs}>
          <div className="mb-3">
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

          <div className="mb-3">
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

          <div className="mb-3">
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

          <button type="submit" className="btn btn-success w-100 mt-3">Sign Up</button>
        </form>
        <p className="mt-3 text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
