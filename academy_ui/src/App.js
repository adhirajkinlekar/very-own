import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import CourseDetails from './components/course_details/course_details.component';
import HomePage from './components/home_page/home_page.component';
import AppContext from './context/app_context';
import CoursePage from './components/learn/learn.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import axiosInstance from './util/axiosInterceptor';

const App = () => {
  const url = window.location.hostname;
  const [publicId] = useState(url.split('.')[0]);
  const [academy, setAcademy] = useState(null);
  const [courses, setCourses] = useState(null);
  const [isAuthenticated, setAuthStatus] = useState(!!getCookie('VERY_OWN_JWT_TOKEN'));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state
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
        setLoading(false); // Set loading to false when the request completes
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

  if (loading) {
    // Display a loading spinner or message while data is being fetched
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
          <div className="app">
            <div className="profile-header p-6 bg-white shadow-md flex justify-between items-center">
              <div className="flex items-center flex-grow">
                <Link to={`/`} className="flex items-center">
                  <img src={academy.imageUrl} alt="Academy Profile" className="avatar w-16 h-16 rounded-full object-cover" />
                  <div className="profile-info ml-4">
                    <h2 className="text-2xl font-bold text-gray-800">{academy.academyName}</h2>
                    <p className="text-sm text-gray-500">{academy.title}</p>
                  </div>
                </Link>
              </div>
              <div className="text-right">
                {isAuthenticated ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      className="flex items-center text-gray-700 focus:outline-none"
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      aria-expanded={dropdownOpen}
                    >
                      <FontAwesomeIcon icon={faUserCircle} className="text-gray-400 text-3xl" />
                    </button>
                    {dropdownOpen && (
                      <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <li className="text-left py-2 px-4 font-bold text-gray-700">Hello, User</li>
                        <li>
                          <Link>
                            <button className="block w-full text-left py-2 px-4 hover:bg-gray-100">Profile</button>
                          </Link>
                        </li>
                        <li>
                          <button className="block w-full text-left py-2 px-4 hover:bg-gray-100" onClick={handleSignOut}>Sign Out</button>
                        </li>
                      </ul>
                    )}
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <a href={`https://sso.veryown.in/secure/${publicId}_academy/signin`} className="inline-block">
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none transition duration-300">
                        Sign In
                      </button>
                    </a>
                    <a href={`https://sso.veryown.in/secure/${publicId}_academy/signup`} className="inline-block">
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none transition duration-300">
                        Sign Up
                      </button>
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="content mt-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/courses/:id" element={<CourseDetails />} />
                <Route path="/courses/:id/learn" element={<CoursePage />} />
              </Routes>
            </div>
          </div>
        ) : (
          <div className="text-center">Academy could not be found or it no longer exists</div>
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
