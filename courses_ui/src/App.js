import { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import CourseDetails from './components/course_details/course_details.component';
import HomePage from './components/home_page/home_page.component';

class App extends Component {

  render() {
    return (
      <Router>
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
              <Route path="/course/:id" element={<CourseDetails />} />
            </Routes>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
