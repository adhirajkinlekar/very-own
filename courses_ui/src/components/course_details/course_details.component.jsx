import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './course_detail.styles.css';

// A pure function is a function that returns the exact same output with the given input everytime.
const CourseDetails = () => {

    const { id } = useParams();

    const [course, setCourse] = useState(null); // [value, setValue], null is initial value

    useEffect(() => {
        const courses = [{
            id: 1,
            title: 'JavaScript Algorithms and Data Structures Masterclass',
            description: 'The Missing Computer Science and Coding Interview Bootcamp',
            imageUrl: 'https://img-c.udemycdn.com/course/750x422/1406344_1d65_3.jpg'
        }, {
            id: 2,
            title: 'The Git & Github Bootcamp',
            description: 'Master the essentials and the tricky bits: rebasing, squashing, stashing, reflogs, blobs, trees, & more!',
            imageUrl: 'https://img-b.udemycdn.com/course/750x422/3792262_6b0c_2.jpg'
        }];

        const course = courses.find(x => x.id === parseInt(id))|| null; // Initial value is null, but find returns undefined

        // When the state changes in a functional component, the entire function is re-executed. 
        // This means all the code inside the function runs again
        // If value hasn't changed, component will not re-run, this behavior is same when it comes to class based components as well
        setCourse(course); 

    }, [id]); // Re-run the effect when the ID changes

    return (
        <div>
            {course ? (
                <div className="card course-page">
                    <div className='col-12' style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className='col-8'>

                            <header className="course-header">
                                <h1>{course.title}</h1>
                                <p className="course-description">{course.description}</p>

                                <div className="course-stats">
                                    <span className="rating">4.4 ★★★★☆ (4,781 ratings)</span>
                                    <span className="students">41,273 students</span>
                                </div>

                                <p className="course-creator">Created by Mehmet Ozkaya </p>

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
                        </div>
                        <div className='col-4'>
                            <section className="preview-section">
                                <img src={course.imageUrl} alt={course.title} />
                                <button className="preview-button">Preview this course</button>
                            </section>
                        </div>
                    </div>


                    <div className="course-content-wrapper">
                        <section className="course-content">
                            <h2>What you'll learn</h2>
                            <ul>
                                <li>Design Microservices Architecture with using Design Patterns, Principles and the Best Practices</li>
                                <li>Learn how to handle millions of request with designing system for High Availability, High Scalability, low latency, and resilience to network failures</li>
                            </ul>
                        </section>

                        <aside className="course-sidebar">
                            {/* <div className="enrollment-section">
                       <p>Included in Personal Plan</p>
                       <button className="enroll-button">Go to course</button>
                       <p className="subscription-info">This course is included in your Personal Plan subscription</p>
                     </div>
                     
                     <div className="business-section">
                       <h3>Training 5 or more people?</h3>
                       <p>Get your team access to 26,000+ top Udemy courses anytime, anywhere.</p>
                       <button className="business-button">Try Udemy Business</button>
                     </div> */}
                        </aside>
                    </div>
                </div>
            ) : (
                <div>No course available</div>
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