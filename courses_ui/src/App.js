import React, { useEffect, useState, createRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CourseDetails from './components/course_details/course_details.component';
import HomePage from './components/home_page/home_page.component';
import AppContext from './context/app_context';
import CoursePage from './components/learn/learn.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './App.css';

// learn about 
// - props.children
// - custom hooks
// - useReducer hook
// - graphql for fetch all required data

const App = () => {

  const url = window.location.hostname;

  const [tanentId] = useState(url.split('.')[0]);

  const [academy, setAcademy] = useState(null);

  const dropdownRef = createRef();

  useEffect(() => {

    const academies = [{
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
      about: "<p> Stephen Grider has been building complex Javascript front ends for top corporations in the San Francisco Bay Area.  With an innate ability to simplify complex topics, Stephen has been mentoring engineers beginning their careers in software development for years, and has now expanded that experience onto Udemy, authoring the highest rated React course. He teaches on Udemy to share the knowledge he has gained with other software engineers.  Invest in yourself by learning from Stephen's published courses.</p",
      imageUrl: 'https://avatars.githubusercontent.com/u/5003903?v=4',
      isActive: true
    }];

    const academy = academies.find(x => x.id === tanentId && x.isActive) || null; // Initial value is null, but find returns undefined

    // When the state changes in a functional component, the entire function is re-executed. 
    // This means all the code inside the function runs again
    // If value hasn't changed, component will not re-run, this behavior is same when it comes to class based components as well
    setAcademy(academy);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Dependency of tanentId is not required as we are sure that tanentId will never update, hence eslint is disabled for the warning here 

  const toggleDropdown = () => {

    const dropdown = dropdownRef.current;

    if (dropdown.style.display === 'none' || !dropdown.style.display) {
      dropdown.style.display = 'block';
    } else {
      dropdown.style.display = 'none';
    }
  };

  const isAuthenticated = false;

  return (
    <Router>
      {/* <MyContext.Provider value={{ state, setState }}> */}
      <AppContext.Provider value={{ isAuthenticated, tanentId, academy }}>
        <React.Fragment> {academy ? (
          <div className="app">
            <div className="profile-header p-3">
              <Link to={`/`}>
                <div style={{ display: 'flex' }}>
                  <img src={academy.imageUrl} alt="Profile" className="avatar" />
                  <div className="profile-info">
                    <h2>{academy.name}</h2>
                    <p>{academy.description}</p>
                  </div>
                </div>
              </Link>
             {
              isAuthenticated ? (
                <div className="dropdown" style={{ marginRight: '100px' }}>
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  aria-expanded="false"
                  onClick={toggleDropdown}>
                  <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: '35px', color: 'gray' }} />
                </button>
                <ul ref={dropdownRef} className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ display:  'none'  }}>
                  <li><a className="dropdown-item" style={{fontWeight: 'bold'}}>Hello, Adhiraj</a></li>
                  <li><a className="dropdown-item">Profile</a></li>
                  <li><a className="dropdown-item">Sign Out</a></li>

                </ul>
              </div>
              ) : <div style={{ marginRight: '100px' }}> <a className="dropdown-item">Sign In</a> </div> 
             }

            </div>
            <div className='content'>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/courses/:id" element={<CourseDetails />} />
                <Route path="/courses/:id/learn" element={<CoursePage />} />
              </Routes>
            </div>
          </div>) :
          (
            <div style={{ textAlign: 'center' }}> Academy could not be found or it no longer exists </div>
          )}
        </React.Fragment>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
