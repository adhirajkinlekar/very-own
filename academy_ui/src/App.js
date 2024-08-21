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
      .then(({academy, courses}) => {  
        setAcademy(academy);
        setCourses(courses);
      })
      .catch((error) => {
  
      });
  },[publicId]);

  const [isAuthenticated, setAuthStatus] = useState(getCookie('isAuthenticated') === 'true');

  const handleSignOut = () => {

    deleteCookie('isAuthenticated');

    setAuthStatus(false);
  };

  return (
    <Router>
      <AppContext.Provider value={{ isAuthenticated, publicId,academyId:academy?._id, academy, courses }}> 
          {academy ? (
            <div className="app">
              <div className="profile-header p-3">
                <div className="d-flex align-items-center flex-grow-1">
                  <Link to={`/`} className="d-flex align-items-center">
                    <img src={academy.imageUrl} alt="Profile" className="avatar" />
                    <div className="profile-info ms-3">
                      <h2>{academy.academyName}</h2>
                      <p>{academy.title}</p>
                    </div>
                  </Link>
                </div>
                <div className="text-end">
                  {isAuthenticated ? (
                    <div className="dropdown">
                      <button
                        className="btn btn-light dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: '35px', color: 'gray' }} />
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><button className="dropdown-item fw-bold">Hello, Adhiraj</button></li>
                        <li><button className="dropdown-item">Profile</button></li>
                        <li><button className="dropdown-item" onClick={handleSignOut}>Sign Out</button></li>
                      </ul>
                    </div> ) 
                    : (
                    <div className="d-flex">
                      <a href={`http://sso.veryown.com:3001/secure/${publicId}_academy/signin`} className="me-2">
                        <button className="btn btn-light">Sign In</button>
                      </a>
                      <a href={`http://sso.academy.veryown.com:3001/auth/signup`}>
                        <button className="btn btn-light">Sign Up</button>
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="content">
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
