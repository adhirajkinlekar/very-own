import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CourseDetails from './components/course_details/course_details.component';
import HomePage from './components/home_page/home_page.component';
import AppContext from './context/app_context';
import CoursePage from './components/learn/learn.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => { 
  
  const url = window.location.hostname;
  const [tenantId] = useState(url.split('.')[0]);
  const [academy, setAcademy] = useState(null);
  const [isAuthenticated, setAuthStatus] = useState(getCookie('isAuthenticated') === 'true');

  useEffect(() => {
    const academies = [
      {
        id: "coltsteele",
        name: 'Colt Steele',
        description: 'Developer and Bootcamp Instructor',
        about: "<p> Hi! I'm Colt. I'm a developer with a serious love for teaching. I've spent the last few years teaching people to program at 2 different immersive bootcamps where I've helped hundreds of people become web developers and change their lives. My graduates work at companies like Google, Salesforce, and Square. </p> <b> Join me on this crazy adventure! </b>",
        imageUrl: 'https://img-c.udemycdn.com/user/200_H/4466306_6fd8_3.jpg',
        isActive: true
      },
      {
        id: 'stepheng',
        name: 'Stephen Grider',
        description: 'Engineering Architect',
        about: "<p> Stephen Grider has been building complex Javascript front ends for top corporations in the San Francisco Bay Area. With an innate ability to simplify complex topics, Stephen has been mentoring engineers beginning their careers in software development for years, and has now expanded that experience onto Udemy, authoring the highest rated React course. He teaches on Udemy to share the knowledge he has gained with other software engineers. Invest in yourself by learning from Stephen's published courses.</p>",
        imageUrl: 'https://avatars.githubusercontent.com/u/5003903?v=4',
        isActive: true
      }
    ];

    const academy = academies.find(x => x.id === tenantId && x.isActive) || null;

    setAcademy(academy);
  }, [tenantId]);

  const handleSignOut = () => {

    deleteCookie('isAuthenticated');

    setAuthStatus(false);
  };

  return (
    <Router>
      <AppContext.Provider value={{ isAuthenticated, tenantId, academy }}> 
          {academy ? (
            <div className="app">
              <div className="profile-header p-3">
                <div className="d-flex align-items-center flex-grow-1">
                  <Link to={`/`} className="d-flex align-items-center">
                    <img src={academy.imageUrl} alt="Profile" className="avatar" />
                    <div className="profile-info ms-3">
                      <h2>{academy.name}</h2>
                      <p>{academy.description}</p>
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
                      <a href={`http://sso.veryown.com:3001/secure/${tenantId}_academy/signin`} className="me-2">
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
