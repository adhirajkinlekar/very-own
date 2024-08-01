import { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CourseDetails from './components/course_details/course_details.component';
import HomePage from './components/home_page/home_page.component';
import AppContext from './context/app_context';

// learn about props.children

class App extends Component {
  // const [state, setState] = useState("Hello, World!");

  render() {
    return (
      <Router>
        {/* <MyContext.Provider value={{ state, setState }}> */}
        <AppContext.Provider value={{ isAuthenticated: true }}>
          <div className="app">
            <div className="profile-header p-3">
              <Link to={`/`}>
                <div style={{ display: 'flex' }}>
                  <img src="https://yt3.googleusercontent.com/ytc/AIdro_mw_uMuYGJpYoUEIvCrsfeYck6ajAjDG3VTPSFsqioBiw=s900-c-k-c0x00ffffff-no-rj" alt="Profile" className="avatar" />
                  <div className="profile-info">
                    <h2>Colt Steele</h2>
                    <p>Developer and Instructor</p>
                  </div>
                </div>
              </Link>

            </div>
            <div className='content'>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/courses/:id" element={<CourseDetails />} />
              </Routes>
            </div>
          </div>
        </AppContext.Provider>
      </Router>
    );
  }
}

export default App;
