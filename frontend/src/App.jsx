import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/register/login';
import Signup from './components/register/signup';
import Header from './components/header/header';
import HomeAfterLogin from './components/home/HomeAfterLogin';
import List from './components/list/list';
import 'aos/dist/aos.css';
import AOS from 'aos';
import './App.css';

function App() {
  // Initialize state with the token stored in localStorage (or null if not present)
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    // Initialize animations (AOS)
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={!token ? <Login setToken={setToken} /> : <Navigate to="/" replace />}
        />
        
        {/* Signup Route */}
        <Route
          path="/signup"
          element={!token ? <Signup setToken={setToken} /> : <Navigate to="/" replace />}
        />

        {/* Home Route */}
        <Route
          path="/"
          element={token ? <HomeAfterLogin setToken={setToken} /> : <Header token={token} setToken={setToken} />}
        />

        {/* My List Page */}
        <Route path="/list" element={<List />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
