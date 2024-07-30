import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetails = () => {

    const { id } = useParams();

    const [course, setCourse] = useState(null);

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

        const course = courses.find(x => x.id == id); // Find the course by ID
        setCourse(course);
    }, [id]); // Re-run the effect when the ID changes

    return (
        <div>
            {course ? (
                <div className="card" style={{ width: '100rem' }}>
                    <div className="course-detail">
                        <div className="course-header">
                            <img width={500} src={course.imageUrl} alt={course.title} className="course-image" />
                            <h1>{course.title}</h1>
                            <p>{course.description}</p>
                        </div>
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
