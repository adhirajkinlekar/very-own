import { Component } from 'react';
import './App.css';
import CardList from './components/card_list/card_list.component';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CourseDetails from './components/course_details/course_details.component';
import { Profile } from './components/profile.jsx/profile';
import HomePage from './components/home_page/home_page.component';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="app">
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
