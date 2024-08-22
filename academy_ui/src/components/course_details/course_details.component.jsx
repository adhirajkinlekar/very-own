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
               <div className="course-page mx-auto max-w-5xl py-8">
               <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
                 <div className="course-content flex-1">
                   <header className="mb-6">
                     <h1 className="text-4xl font-bold text-gray-800">{course.courseName}</h1>
                     <p className="mt-2 text-lg text-gray-600">{course.headline}</p>
                   </header>
             
                   <section
                     className="course-description text-gray-700 leading-relaxed"
                     dangerouslySetInnerHTML={{ __html: course.description }}
                   ></section>
                 </div>
             
                 <div className="preview-section flex flex-col items-center space-y-4 lg:w-1/3">
                   <img
                     src={course.imageUrl}
                     alt={course.title}
                     className="w-full h-64 object-cover rounded-lg shadow-md"
                   />
                   <button
                     onClick={handleButtonClick}
                     className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
                   >
                     {isAuthenticated ? 'Go to course' : 'Login to view'}
                   </button>
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
