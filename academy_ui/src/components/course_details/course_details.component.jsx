import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './course_detail.styles.css';
import AppContext from '../../context/app_context';
import { useNavigate } from 'react-router-dom';

// A pure function is a function that returns the exact same output with the given input everytime.

const CourseDetails = () => {
    const navigate = useNavigate();
    const { isAuthenticated, tenantId } = useContext(AppContext);
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    const handleButtonClick = () => {
        if (isAuthenticated) {
            navigate(`./learn`);
        } else {
            window.location.href = `http://sso.veryown.com:3001/secure/${tenantId}_academy/signin`;
        }
    };

    // useEffect is a hook that lets you perform side effects in functional components. 
    // Side effects include data fetching, setting up a subscription, and manually changing the DOM. 
    // It serves a similar purpose to lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount in class components.


    useEffect(() => {
        const courses = [
            {
                id: 1,
                title: 'JavaScript Algorithms and Data Structures Masterclass',
                description: 'The Missing Computer Science and Coding Interview Bootcamp',
                imageUrl: 'https://img-c.udemycdn.com/course/750x422/1406344_1d65_3.jpg',
                academyId: "coltsteele",
                isActive: true
            },
            {
                id: 2,
                title: 'The Git & Github Bootcamp',
                description: 'Master the essentials and the tricky bits: rebasing, squashing, stashing, reflogs, blobs, trees, & more!',
                imageUrl: 'https://img-b.udemycdn.com/course/750x422/3792262_6b0c_2.jpg',
                academyId: "coltsteele",
                isActive: true
            },
            {
                id: 3,
                title: 'The Linux Command Line Bootcamp: Beginner To Power User',
                description: 'Level Up Your Skills And Take Control Of Your Machine, w/ Dozens of Commands, Projects, and Challenges!',
                imageUrl: 'https://img-c.udemycdn.com/course/750x422/1406344_1d65_3.jpg',
                academyId: "coltsteele",
                isActive: false
            },
            {
                id: 4,
                title: 'Code with Ethereum & Solidity: The Complete Developer Guide',
                description: 'Intensive masterclass on ChatGPT, LangChain, and Python. Make production-ready apps focused on real-world AI integration',
                imageUrl: 'https://img-b.udemycdn.com/course/750x422/1466612_bead_3.jpg',
                academyId: "stepheng",
                isActive: true
            }
        ];

        const course = courses.find(x => x.id === parseInt(id) && tenantId === x.academyId && x.isActive) || null;
        setCourse(course);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
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
                                <h1>{course.title}</h1>
                                <p className="course-description">{course.description}</p>
                                <div className="course-stats">
                                    <span className="rating">4.4 ★★★★☆ (4,781 ratings)</span>
                                    <span className="students">41,273 students</span>
                                </div>
                                <p className="course-creator">Created by Mehmet Ozkaya</p>
                                <div className="course-info">
                                    <span>Last updated 4/2024</span>
                                    <span>English</span>
                                    <span>English, Arabic [Auto], 9 more</span>
                                </div>
                            </header>
                            <section className="related-topics">
                                <h2>Explore related topics</h2>
                                <div className="topics">
                                    <button>Microservices</button>
                                    <button>Other IT & Software</button>
                                    <button>IT & Software</button>
                                </div>
                            </section>
                            <section className="course-content">
                                <h2>What you'll learn</h2>
                                <ul>
                                    <li>Design Microservices Architecture with using Design Patterns, Principles and the Best Practices</li>
                                    <li>Learn how to handle millions of request with designing system for High Availability, High Scalability, low latency, and resilience to network failures</li>
                                </ul>
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
