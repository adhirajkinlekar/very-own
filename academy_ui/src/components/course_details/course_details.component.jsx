import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './course_detail.styles.css';
import AppContext from '../../context/app_context';
import { useNavigate } from 'react-router-dom';

// A pure function is a function that returns the exact same output with the given input everytime.

const CourseDetails = () => {
    const navigate = useNavigate();
    const { isAuthenticated, publicId, academyId } = useContext(AppContext);
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    const handleButtonClick = () => {
        if (isAuthenticated) {
            navigate(`./learn`);
        } else {
            window.location.href = `http://sso.veryown.com:3001/secure/${publicId}_academy/signin`;
        }
    };

    // useEffect is a hook that lets you perform side effects in functional components. 
    // Side effects include data fetching, setting up a subscription, and manually changing the DOM. 
    // It serves a similar purpose to lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount in class components.


    useEffect(() => {
        fetch(`http://localhost:5001/api/academy/${academyId}/courses/${id}`) // Replace with your API URL
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(({course}) => { 
          console.log({course})
          setCourse(course);
        })
        .catch((error) => {
    
        })}, [id]);
    // called after first render and everytime the ID value changes
    // [] - called after first render, never called again
    // no arguments - called after first render, never called again

    return (
        <div className="container">
            {course ? (
                <div className="course-page">
                    <div className='course-content-wrapper'>
                        <div className='course-content'>
                            <header className="course-header">
                                <h1>{course.courseName}</h1>
                                <p className="course-description">{course.headline}</p>
                                {/* <div className="course-stats">
                                    <span className="rating">4.4 ★★★★☆ (4,781 ratings)</span>
                                    <span className="students">41,273 students</span>
                                </div> */}
                                {/* <p className="course-creator">Created by Mehmet Ozkaya</p> */}
                                {/* <div className="course-info">
                                    <span>Last updated 4/2024</span>
                                    <span>English</span>
                                    <span>English, Arabic [Auto], 9 more</span>
                                </div> */}
                            </header>
                            {/* <section className="related-topics">
                                <h2>Explore related topics</h2>
                                <div className="topics">
                                    <button>Microservices</button>
                                    <button>Other IT & Software</button>
                                    <button>IT & Software</button>
                                </div>
                            </section> */}
                            <section className="course-content" dangerouslySetInnerHTML={{ __html: course.description }}>
                            </section>
                        </div>
                        <div className='preview-section'>
                            <img src={course.imageUrl} alt={course.title} />
                            <button onClick={handleButtonClick} className="preview-button">{isAuthenticated ? 'Go to course' : 'Login to view'}</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: 'center' }}>Course is not available or has been archived</div>
            )}
        </div>
    );
};

export default CourseDetails;


// Outlet: Renders nested routes.
// Switch: Renders the first matching route among its children.


// useState: Allows functional components to have state.
// useEffect: Side effects management (e.g., data fetching, subscriptions). It runs after rendering and can be used for cleanup.
// useContext: Accesses context values, which are useful for global state management.
// Custom Hooks: Custom logic shared across multiple components.
