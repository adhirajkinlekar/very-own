import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CourseDetails from './components/course_details/course_details.component';
import HomePage from './components/home_page/home_page.component';
import AppContext from './context/app_context';
import CoursePage from './components/learn/learn.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './App.css';

// ideally maintain two records for users one for customers of services and one for creator. When a user signs up as a creator it creates an additional super admin user record in admin service 

const App = () => {

  const url = window.location.hostname;
  const [publicId] = useState(url.split('.')[0]);
  const [academy, setAcademy] = useState(null);
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/api/academy/customer/${publicId}`) // Replace with your API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(({ academy, courses }) => {
        setAcademy(academy);
        setCourses(courses);
      })
      .catch((error) => {

      });
  }, [publicId]);

  const [isAuthenticated, setAuthStatus] = useState(localStorage.getItem('JWT_TOKEN'));

  const handleSignOut = () => {

    deleteCookie('isAuthenticated');

    setAuthStatus(false);
  };

  return (
    <Router>
      <AppContext.Provider value={{ isAuthenticated, publicId, academyId: academy?._id, academy, courses }}>
        {academy ? (
          <div className="app">
            <div className="profile-header p-6 bg-white shadow-md flex justify-between items-center">
              <div className="flex items-center flex-grow">
                <Link to={`/`} className="flex items-center">
                  <img src={academy.imageUrl} alt="Profile" className="avatar w-16 h-16 rounded-full object-cover" />
                  <div className="profile-info ml-4">
                    <h2 className="text-2xl font-bold text-gray-800">{academy.academyName}</h2>
                    <p className="text-sm text-gray-500">{academy.title}</p>
                  </div>
                </Link>
              </div>
              <div className="text-right">
                {isAuthenticated ? (
                  <div className="relative">
                    <button
                      className="flex items-center text-gray-700 focus:outline-none"
                      type="button"
                      id="dropdownMenuButton"
                      aria-expanded="false">
                      <FontAwesomeIcon icon={faUserCircle} className="text-gray-400 text-3xl" />
                    </button>
                    <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <li className="py-2 px-4 font-bold text-gray-700">Hello, Adhiraj</li>
                      <li>
                        <button className="block w-full text-left py-2 px-4 hover:bg-gray-100">Profile</button>
                      </li>
                      <li>
                        <button className="block w-full text-left py-2 px-4 hover:bg-gray-100" onClick={handleSignOut}>Sign Out</button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <a href={`http://sso.veryown.com:3001/secure/${publicId}_academy/signin`} className="inline-block">
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none transition duration-300">
                        Sign In
                      </button>
                    </a>
                    <a href={`http://sso.academy.veryown.com:3001/auth/signup`} className="inline-block">
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

const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name) => {
  // Set cookie's expiration date to a past date
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

export default App;
