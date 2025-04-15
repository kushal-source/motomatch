// App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/register/login';
import Signup from './components/register/signup';
import Header from './components/header/header';
import HomeAfterLogin from './components/home/HomeAfterLogin';
import './App.css';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {/* Login Route: If not logged in, show login page. Otherwise, redirect to Home */}
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" replace />}
        />
        
        {/* Signup Route: If not logged in, show signup page. Otherwise, redirect to Home */}
        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/" replace />}
        />

        {/* Home Route: If logged in, show HomeAfterLogin, otherwise show Header */}
        <Route
          path="/"
          element={token ? <HomeAfterLogin /> : <Header />}
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
