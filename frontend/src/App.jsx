import { useEffect } from 'react';  // Add this import statement
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/register/login';
import Signup from './components/register/signup';
import Header from './components/header/header';
import HomeAfterLogin from './components/home/HomeAfterLogin';
import List from './components/list/list';  // Importing List Component
import 'aos/dist/aos.css';  // Importing AOS CSS for animation styles
import AOS from 'aos'; // Importing AOS JS to handle animations
import './App.css';

function App() {
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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

        {/* Route for My List page */}
        <Route path="/list" element={<List />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
