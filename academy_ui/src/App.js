import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CourseDetails from './components/course_details/course_details.component';
import HomePage from './components/home_page/home_page.component';
import AppContext from './context/app_context';
import CoursePage from './components/learn/learn.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from './util/axiosInterceptor';
import './App.css';  

const App = () => {
  const [publicId] = useState(url.split('.')[0]);
  const [academy, setAcademy] = useState(null);
  const [courses, setCourses] = useState(null);
  const [isAuthenticated, setAuthStatus] = useState(!!getCookie('VERY_OWN_JWT_TOKEN'));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchAcademyData = async () => {
      try {
        const response = await axiosInstance.get(`https://api-academy.veryown.in/api/academy/customer/${publicId}`);
        const data = response.data;

        setAcademy(data.academy);
        setCourses(data.courses);
      } catch (error) {
        console.error('Error fetching academy data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAcademyData();
  }, [publicId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    deleteCookie('VERY_OWN_JWT_TOKEN');
    setAuthStatus(false);
    if (window.location.pathname !== '/') {
      window.location.assign('/'); // Redirect to '/'
   }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <AppContext.Provider value={{ isAuthenticated, publicId, academyId: academy?._id, academy, courses }}>
        {academy ? (
          <div className="app-container">
            <header className="header">
              <div className="header-content">
                <Link to="/" className="academy-link">
                  <img src={academy.imageUrl} alt="Academy Profile" className="academy-image" />
                  <div className="academy-info">
                    <h1 className="academy-name">{academy.academyName}</h1>
                    <p className="academy-title">{academy.title}</p>
                  </div>
                </Link>

                <nav className="nav" ref={dropdownRef}>
                  {isAuthenticated ? (
                    <div className="dropdown">
                      <button
                        onClick={toggleDropdown}
                        aria-expanded={dropdownOpen}
                        className="dropdown-button"
                      >
                        <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
                      </button>
                      {dropdownOpen && (
                        <ul className="dropdown-menu" style={{ color: 'black' }}>
                          <li className="dropdown-item">Hello, User</li>
                          <li className="dropdown-item">
                            <button className="dropdown-item-button">Profile</button>
                          </li>
                          <li className="dropdown-item">
                            <button
                              onClick={handleSignOut}
                              className="dropdown-item-button"
                            >
                              Sign Out
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>
                  ) : (
                    <div className="auth-buttons">
                      <a href={`http://sso.veryown.in/secure/${publicId}_academy/signin`} className="auth-link">
                        <button className="auth-button">Sign In</button>
                      </a>
                      <a href={`http://sso.veryown.in/secure/${publicId}_academy/signup`} className="auth-link">
                        <button className="auth-button">Sign Up</button>
                      </a>
                    </div>
                  )}
                </nav>
              </div>
            </header>

            <main className="main-content">
              <div className="content-container">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/courses/:id" element={<CourseDetails />} />
                  <Route path="/courses/:id/learn" element={<CoursePage />} />
                </Routes>
              </div>
            </main>

            <footer className="footer">
              <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} {academy.academyName}. All rights reserved.</p>
              </div>
            </footer>
          </div>
        ) : (
          <div className="error">
            <p>Service could not be found or it no longer exists</p>
          </div>
        )}
      </AppContext.Provider>
    </Router>
  );
};

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const deleteCookie = (name) => {
  document.cookie = `${name}=; path=/; domain=.veryown.in; samesite=strict`;
};

export default App;
